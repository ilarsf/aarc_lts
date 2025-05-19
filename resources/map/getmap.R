###############################################################################
# Huron River (Barton → Argo)  —  OSM extract + SVG-ready coordinates
###############################################################################

## -- USER SETTINGS ----------------------------------------------------------
bbox_vec <- c(-83.759509, 42.290033, -83.739334, 42.308492) # xmin,ymin,xmax,ymax
svg_width <- 800
svg_height <- 600
svg_pad <- 50
simp_tol_m <- 10 # simplification (m)

## -- PACKAGES ---------------------------------------------------------------
pkgs <- c("osmdata", "sf", "data.table") # <- dplyr only called namespace-qualified
to_add <- pkgs[!vapply(pkgs, requireNamespace, logical(1), quietly = TRUE)]
if (length(to_add)) install.packages(to_add)
lapply(pkgs, library, character.only = TRUE)

## -- HELPERS ----------------------------------------------------------------
get_osm <- function(bbox, key, value, ...) {
    opq(bbox, timeout = 120L) |>
        add_osm_feature(key = key, value = value, ...) |>
        osmdata_sf()
}

sf_bind <- function(lst) { # row-bind sf objects safely
    lst <- Filter(function(x) !is.null(x) && nrow(x), lst)
    if (!length(lst)) {
        return(NULL)
    }
    dplyr::bind_rows(lst) # keeps geometry & fills missing cols
}

centroid_keep <- function(sf_obj) {
    if (!inherits(sf_obj$geometry[[1]], "POINT")) {
        sf_obj$geometry <- st_centroid(sf_obj$geometry)
    }
    sf_obj
}

coords_dt <- function(sf_obj) {
    if (is.null(sf_obj) || !nrow(sf_obj)) {
        return(NULL)
    }
    data.table(st_coordinates(sf_obj)[, 1:2],
        Name = sf_obj$name[1]
    )
}

scale_svg <- function(dt, bbox_all) {
    rng <- bbox_all[, .(dx = max(X) - min(X), dy = max(Y) - min(Y))]
    s <- min(
        (svg_width - 2 * svg_pad) / rng$dx,
        (svg_height - 2 * svg_pad) / rng$dy
    )
    dt[, `:=`(
        svg_x = svg_pad + (X - min(bbox_all$X)) * s,
        svg_y = svg_pad + (max(bbox_all$Y) - Y) * s
    )]
    invisible(dt)
}

nz <- function(a, b) ifelse(!is.na(a), a, b) # simple “coalesce”

## -- 1. RIVER ----------------------------------------------------------------
river_lines <- get_osm(bbox_vec, "waterway", "river")$osm_lines
river_lines <- subset(river_lines, name == "Huron River")

## -- 2. DAMS -----------------------------------------------------------------
dams_sf <- sf_bind(list(
    get_osm(bbox_vec, "waterway", "dam")$osm_points,
    get_osm(bbox_vec, "man_made", "dam")$osm_points
))
argo_dam <- subset(dams_sf, grepl("argo", name, TRUE))[1, ]
barton_dam <- subset(dams_sf, grepl("barton", name, TRUE))[1, ]

## -- 3. BRIDGES --------------------------------------------------------------
bridges_sf <- sf_bind(list(
    get_osm(bbox_vec, "bridge", NULL)$osm_lines,
    get_osm(bbox_vec, "bridge", NULL)$osm_polygons
))
lbl <- nz(bridges_sf$name, bridges_sf$ref)
m14_bridge <- bridges_sf[grepl("M-?14|US ?23", lbl, TRUE), ][1, ]
rail_bridge <- bridges_sf[grepl("rail", lbl, TRUE) |
    grepl("rail", bridges_sf$bridge, TRUE), ][1, ]

## -- 4. ARGO CANOE LIVERY ----------------------------------------------------
livery_sf <- sf_bind(list(
    get_osm(bbox_vec, "amenity", "boat_rental")$osm_points,
    get_osm(bbox_vec, "sport", "canoeing")$osm_points,
    get_osm(bbox_vec, "leisure", "slipway")$osm_points
))
argo_livery <- subset(
    livery_sf,
    grepl("argo.*(livery|canoe|park)", name, TRUE)
)[1, ]

## -- 5. SIMPLIFY RIVER + COLLECT CO-ORDS ------------------------------------
river_simpl <- st_transform(river_lines, 3857) |>
    st_simplify(dTolerance = simp_tol_m) |>
    st_transform(4326)
riv_dt <- data.table(st_coordinates(river_simpl)[, 1:2])
setnames(riv_dt, c("X", "Y"))

pts_dt <- rbindlist(list(
    coords_dt(centroid_keep(argo_dam)),
    coords_dt(centroid_keep(barton_dam)),
    coords_dt(centroid_keep(argo_livery)),
    coords_dt(centroid_keep(m14_bridge)),
    coords_dt(centroid_keep(rail_bridge))
), use.names = TRUE, fill = TRUE)

## -- 6. SCALE TO SVG ---------------------------------------------------------
all_xy <- rbindlist(list(riv_dt, pts_dt[, .(X, Y)]))
scale_svg(riv_dt, all_xy)
pts_svg <- copy(pts_dt)
scale_svg(pts_svg, all_xy)

## -- 7. SVG PATH & OUTPUT ----------------------------------------------------
path_str <- paste0(
    "M ", riv_dt$svg_x[1], ",", riv_dt$svg_y[1], " ",
    paste0("L ", riv_dt$svg_x[-1], ",", riv_dt$svg_y[-1],
        collapse = " "
    )
)

cat("\nSVG path (river):\n", path_str, "\n\n")

if (nrow(pts_svg)) {
    cat("SVG points (cx cy name):\n")
    print(pts_svg[, .(svg_x, svg_y, Name)])
}

cat("\nDone.\n")

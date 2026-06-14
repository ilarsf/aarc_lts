---
layout: default
title: Next Steps After Learn to Scull
description: Guidance on continuing your rowing journey after completing the AARC Learn to Scull program.
---
{% assign lts_schedule = site.data.learn_to_scull_schedule %}

<style>
  .content-image {
    max-width: 500px; /* Adjust as needed */
    width: 100%;
    height: auto;
    border-radius: 8px; /* Assuming var(--border-radius) is 8px */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Assuming var(--box-shadow) */
    margin-top: 1rem;
    margin-bottom: 2rem;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .phase-journey {
    margin: 2rem 0 2.5rem;
  }

  .phase-journey-header {
    max-width: 760px;
    margin: 0 auto 1.25rem;
    text-align: center;
  }

  .phase-journey-header h2 {
    margin-bottom: 0.5rem;
  }

  .phase-journey-header p {
    margin: 0;
    color: #5f6b76;
  }

  .phase-legend {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.85rem;
    margin-bottom: 1.25rem;
  }

  .phase-summary {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem;
    border: 1px solid #d9e0e8;
    border-left: 5px solid var(--phase-color);
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 3px 8px rgba(15, 35, 52, 0.08);
  }

  .phase-summary-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 2.4rem;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    background: var(--phase-tint);
    color: var(--phase-color);
  }

  .phase-summary h3 {
    margin: 0;
  }

  .phase-summary p {
    margin: 0.25rem 0 0;
    color: #4e5a64;
  }

  .phase-journey-note {
    max-width: 760px;
    margin: 1rem auto 0;
    color: #4e5a64;
    text-align: center;
  }

  .phase-one {
    --phase-color: #0f766e;
    --phase-tint: #e7f6f3;
  }

  .phase-two {
    --phase-color: #0f4c81;
    --phase-tint: #e9f2fa;
  }

  .phase-three {
    --phase-color: #8f3151;
    --phase-tint: #fbedf2;
  }

  @media (max-width: 820px) {
    .phase-legend {
      grid-template-columns: 1fr;
    }
  }
</style>

<div class="container my-5">

    <div class="section-header">
        <h1>Continue Your Rowing Journey</h1>
        <p class="lead">Congratulations on completing the Learn to Scull program! Here’s how you can continue to develop your skills and enjoy rowing with AARC.</p>

        <div class="info-box note mt-3">
          <h4>Program Fees</h4>
          <p><strong>Learn to Scull class:</strong> {{ lts_schedule.class_fee }} or {{ lts_schedule.discounted_class_fee }}.</p>
          <p><strong>Phase 2 price:</strong> <span class="phase-price-inline">{{ lts_schedule.trial_fee }}</span> for the fixed four-week Open Sculling trial immediately after your class.</p>
          <p><strong>Covered Open/Tech rowers:</strong> {{ lts_schedule.open_tech_fee_exemption_note }}</p>
          <p><strong>Phase 3 price:</strong> purchase the remaining season with the prorated program fee shown for your session and pay the club membership fee, unless you already paid for the Open/Tech Summer Program or Full Season.</p>
        </div>
    </div>

    <section class="phase-journey" aria-labelledby="phase-journey-heading">
        <div class="phase-journey-header">
            <h2 id="phase-journey-heading">Three Phases After Registration</h2>
            <p>Each Learn to Scull cohort follows the same three-phase path.</p>
        </div>

        <div class="phase-legend" aria-label="Program phase summary">
            <div class="phase-summary phase-one">
                <span class="phase-summary-icon" aria-hidden="true"><i class="fas fa-graduation-cap"></i></span>
                <div>
                    <h3>Phase 1: LTS</h3>
                    <p>Four coached Learn to Scull sessions over two weekends.</p>
                </div>
            </div>
            <div class="phase-summary phase-two">
                <span class="phase-summary-icon" aria-hidden="true"><i class="fas fa-water"></i></span>
                <div>
                    <h3>Phase 2: LTS Trial</h3>
                    <p>Fixed four-week Open Sculling trial immediately after your class.</p>
                </div>
            </div>
            <div class="phase-summary phase-three">
                <span class="phase-summary-icon" aria-hidden="true"><i class="fas fa-users"></i></span>
                <div>
                    <h3>Phase 3: Open Sculling</h3>
                    <p>Join for the remainder of the season, or the new season for the final cohort.</p>
                </div>
            </div>
        </div>

        <p class="phase-journey-note">For exact cohort trial dates, continuation dates, fees, and weekly signup steps, use the Open Sculling Trial Guide below.</p>
    </section>

    <img src="https://images.clubexpress.com/757878/graphics/clubsculling5in_549792197.jpg" alt="AARC single sculler on the water" class="content-image">

    <h2>Choosing Your Next Step</h2>
    <p>During Learn to Scull, your coaches helped you build the foundation for supervised club sculling. The usual path is to become a full AARC member, complete the fixed four-week Open Sculling trial for your cohort, and then decide whether to continue with the Open Sculling Program for the remainder of the season.</p>

    <h3>1. Become a Full Club Member</h3>
    <p>Membership is required before you can register for the Open Sculling trial or sign up for practices. It also gives you access to club communications, member resources, and the broader AARC rowing community.</p>
    <a href="{{ site.baseurl }}/for-learners/resources/membership.html"  class="btn btn-primary">Membership Info</a>

    <h3>2. Use the Open Sculling Trial as Your Bridge</h3>
    <p>The trial provides supervised water time, help with club routines and equipment, and a path toward possible future independent-rowing approval. Your LTS coaches will provide final registration guidance during your last session.</p>
    <a href="{{ site.baseurl }}/for-learners/resources/open-sculling-program-details.html"  class="btn btn-primary">Open Sculling Trial Guide</a>

    <h2>General Advice for Continued Development</h2>    
    <ul>
        <li><strong>Be Consistent:</strong> Regular time on the water is key to reinforcing skills.</li>
        <li><strong>Ask Questions:</strong> Don't hesitate to ask coaches or experienced members for advice.</li>
        <li><strong>Stay Patient:</strong> Sculling is a complex sport; mastery takes time and practice.</li>
        <li><strong>Focus on One Thing at a Time:</strong> When practicing, try to isolate one aspect of your technique to improve.</li>
        <li><strong>Enjoy the Process:</strong> Celebrate your progress and enjoy the journey of becoming a proficient sculler!</li>
    </ul>

    <div class="mt-5">
        <a href="{{ site.baseurl }}/for-learners/#resources" class="btn btn-primary"><i class="fas fa-arrow-left"></i> Back to Resources</a>
        <a href="{{ site.baseurl }}/index.html" class="btn btn-primary">Return to Homepage <i class="fas fa-home"></i></a>
    </div>
</div>

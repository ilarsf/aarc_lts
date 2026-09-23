---
layout: default
title: AARC Learn to Scull Program
homepage: true
---
{% assign lts_schedule = site.data.learn_to_scull_schedule %}

<section class="home-hero" aria-labelledby="home-title">
  <div class="home-hero-copy">
    <p class="home-eyebrow">Ann Arbor Rowing Club · Learn to Scull</p>
    <h1 id="home-title">Learn to scull with AARC</h1>
    <p class="home-lead">A beginner program for adults, with small classes, coached practice, and a clear path from your first strokes to continued rowing.</p>
    <div class="button-row">
      <a href="{{ site.baseurl }}/for-learners/" class="cta-button">Explore the learner guide</a>
      <a href="#program-details" class="cta-button secondary">Program details</a>
    </div>
  </div>
  <div class="home-path" aria-label="How to get started">
    <p class="home-path-title">Your next steps</p>
    <ol>
      <li>Explore the learner guide</li>
      <li>Use the 2026 timeline as a planning example</li>
      <li>Check AARC for registration updates</li>
    </ol>
  </div>
</section>

<aside class="season-notice" aria-label="Season status">
  <div>
    <p class="notice-label">2027 class update</p>
    <p><strong>Updates about 2027 classes will follow before the spring 2027 season starts.</strong> The 2026 dates and prices below are planning examples only; 2027 details are unannounced and may change.</p>
  </div>
  <a href="https://aarc.clubexpress.com/" target="_blank" rel="noopener noreferrer">Check AARC for updates</a>
</aside>

<section class="home-section" aria-labelledby="expect-title">
  <div class="home-section-heading">
    <p class="home-eyebrow">The experience</p>
    <h2 id="expect-title">What to expect</h2>
  </div>
  <div class="home-facts">
    <article>
      <p class="fact-number">01</p>
      <h3>Small group coaching</h3>
      <p>Past classes have used four three-hour sessions over two weekends, with up to six scullers and one coach for every three students. The 2027 format is to be confirmed.</p>
      <a href="{{ site.baseurl }}/for-learners/getting-started/program-overview.html">See the program format</a>
    </article>
    <article>
      <p class="fact-number">02</p>
      <h3>Skills and safety</h3>
      <p>Build your rowing technique step by step and practice the safety skills needed on the water, including self-rescue.</p>
      <a href="{{ site.baseurl }}/for-learners/#safety">Explore safety resources</a>
    </article>
    <article>
      <p class="fact-number">03</p>
      <h3>A path to keep rowing</h3>
      <p>Continue with supervised practice after class and work toward independent rowing when approved.</p>
      <a href="{{ site.baseurl }}/for-learners/resources/next-steps.html">See what comes next</a>
    </article>
  </div>
</section>

<section id="program-details" class="home-section home-program" aria-labelledby="details-title">
  <div class="home-section-heading">
    <p class="home-eyebrow">Upcoming classes</p>
    <h2 id="details-title">2027 class information</h2>
    <p>Confirmed 2027 details will be posted before the spring season starts. The 2026 examples below show how classes, trial periods, continuation, and costs fit together; they are not the 2027 schedule or prices.</p>
  </div>

  <div class="home-details-grid">
    <div>
      <h3>Schedule</h3>
      <dl>
        <div><dt>2027 dates</dt><dd>To be announced</dd></div>
        <div><dt>2026 example</dt><dd>Classes ran from May 30 to August 2, across four sessions per class.</dd></div>
        <div><dt>2027 format</dt><dd>To be confirmed</dd></div>
      </dl>
    </div>
    <div>
      <h3>Registration and fees</h3>
      <dl>
        <div><dt>Registration</dt><dd>To be announced</dd></div>
        <div><dt>2027 fees</dt><dd>To be announced</dd></div>
        <div><dt>2026 class fee</dt><dd>{{ lts_schedule.class_fee }}*</dd></div>
        <div><dt>2026 reduced fee</dt><dd>{{ lts_schedule.discounted_class_fee }}*</dd></div>
        <div><dt>2026 trial fee</dt><dd>{{ lts_schedule.trial_fee }}*</dd></div>
      </dl>
      <p class="historical-price-note">* 2026 prices only. 2027 prices may change.</p>
    </div>
    <div>
      <h3>Coach team</h3>
      <p>2027 coaches: To be determined. The team will be announced with the class details.</p>
    </div>
  </div>

  <div class="example-schedule">
    <h3>2026 class, continuation, and price examples</h3>
    <p><strong>For planning only:</strong> these dates and prices are from the completed 2026 season. The 2027 sequence, timing, and prices may change.</p>
    <div class="schedule-table-wrapper">
      <table class="schedule-table">
        <caption>2026 Learn to Scull class dates, follow-on periods, and continuation fees</caption>
        <thead>
          <tr>
            <th scope="col">Class</th>
            <th scope="col">Class dates</th>
            <th scope="col">Four-week trial example</th>
            <th scope="col">Continuation example</th>
            <th scope="col">2026 continuation fee*</th>
          </tr>
        </thead>
        <tbody>
          {% for session in lts_schedule.sessions %}
          <tr>
            <th scope="row">{{ session.name | escape }}</th>
            <td>{{ session.class_dates | escape }}</td>
            <td>{{ session.trial_dates | escape }}</td>
            <td>{{ session.continuation_dates | escape }}</td>
            <td>{% if session.continuation_fee %}{{ session.continuation_fee | escape }}*{% else %}Not listed{% endif %}</td>
          </tr>
          {% endfor %}
        </tbody>
      </table>
    </div>
    <p class="historical-price-note">* 2026 price only. The 2027 price may change.</p>
  </div>
</section>

<section class="home-contact" aria-labelledby="help-title">
  <div>
    <p class="home-eyebrow">Questions?</p>
    <h2 id="help-title">We can help you get started.</h2>
    <p>Email <a href="mailto:{{ lts_schedule.program_contact_email }}">{{ lts_schedule.program_contact_email }}</a> or use the contact page.</p>
  </div>
  <a href="{{ site.baseurl }}/about/contact.html" class="cta-button secondary">Contact AARC</a>
</section>

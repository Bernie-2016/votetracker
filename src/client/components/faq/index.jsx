import React from 'react';

const Faq = () => {
  const email = <a href="mailto:votetracker@berniesanders.com">votetracker@berniesanders.com</a>;
  return (
    <div className="faq">
      <p>1. They couldn’t give me Democratic turnout for the day, but only total turnout,
          including Republicans. Is that okay?</p>
      <p>That’s totally fine! Our reporting time would love your total counts for the day.</p>
      <p>My election official said my report is for multiple precincts.
          How do I know which ones to enter?</p>
      <p>If you get them broken down by precinct, it’d be great to have each one.
          If, however, you receive the results as an aggregate for all the precincts,
          you can select ‘all precincts’ from the drop down instead.</p>
      <p>I don’t see my polling location in my drop down. How can I report my results?</p>
      <p>Email them to us at {email}, or you can text or call us at
          802) 448-0742.
          Include all the same information you would in a report and we’ll take care of it.</p>
      <p>I ran into a problem voting my polling location that I’m concerned about.
          How do I report it?</p>
      <p>Email {email} with “PROBLEM” in the subject line or text or call
          (802) 448-0742 with your concerns.</p>
    </div>
  );
};

export default Faq;

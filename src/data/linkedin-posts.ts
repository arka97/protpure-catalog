/*
  Posts from ProtPure's LinkedIn page, shown on the Contact page.

  They are added by hand. LinkedIn gives a company page's posts only to developer apps it has approved, and
  the Lovable LinkedIn connection covers a personal profile, so the site cannot fetch them.

  To add a post: on LinkedIn open the post's "…" menu, choose "Copy link to post", and copy the text as it
  was posted. An entry here is something the company published; never write a post for this list.
  The Contact page shows the three newest. With no entries it shows no posts section.
*/

export interface LinkedInPost {
  /** Link to the post on LinkedIn. */
  url: string;
  /** The day it was posted, as YYYY-MM-DD. */
  date: string;
  /** The opening of the post, as written. A card shows about six lines of it. */
  text: string;
}

export const LINKEDIN_POSTS: LinkedInPost[] = [];

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { LinkedInFeed } from "@/components/site/LinkedInFeed";
import { LINKEDIN_POSTS, type LinkedInPost } from "@/data/linkedin-posts";

/*
  LinkedIn posts on the Contact page are entered by hand (src/data/linkedin-posts.ts).
  These tests keep the list to real posts: every entry links to a post on LinkedIn and carries the day
  it was posted.
*/

afterEach(cleanup);

const post = (n: number, date: string): LinkedInPost => ({
  url: `https://www.linkedin.com/posts/protpure-tech-pvt-ltd_post-activity-${n}`,
  date,
  text: `Post number ${n}`,
});

describe("LinkedIn posts", () => {
  it("lists only posts on LinkedIn, each with its text and the day it was posted", () => {
    const today = new Date().toISOString().slice(0, 10);
    for (const p of LINKEDIN_POSTS) {
      expect(p.url, p.url).toMatch(/^https:\/\/www\.linkedin\.com\/(posts|feed\/update)\/\S+$/);
      // A calendar day that exists, and not one still to come.
      expect(new Date(`${p.date}T00:00:00Z`).toISOString().slice(0, 10), p.url).toBe(p.date);
      expect(p.date <= today, p.url).toBe(true);
      expect(p.text.trim().length, p.url).toBeGreaterThan(20);
    }
    expect(new Set(LINKEDIN_POSTS.map((p) => p.url)).size).toBe(LINKEDIN_POSTS.length);
  });

  it("shows nothing when the list is empty", () => {
    expect(render(<LinkedInFeed posts={[]} />).container).toBeEmptyDOMElement();
  });

  it("shows the three newest posts, newest first, each opening on LinkedIn", () => {
    const posts = [post(1, "2026-03-02"), post(2, "2026-09-18"), post(3, "2025-12-24"), post(4, "2026-06-30")];
    render(<LinkedInFeed posts={posts} />);

    expect(screen.getByRole("heading", { name: "From our LinkedIn page" })).toBeInTheDocument();
    const cards = screen.getAllByRole("link", { name: /Read on LinkedIn/ });
    expect(cards.map((a) => a.getAttribute("href"))).toEqual([posts[1].url, posts[3].url, posts[0].url]);
    expect(cards[0]).toHaveTextContent("18 September 2026");
    expect(cards[0]).toHaveTextContent("Post number 2");
    for (const a of cards) {
      expect(a).toHaveAttribute("target", "_blank");
      expect(a).toHaveAttribute("rel", "noopener noreferrer");
    }
  });
});

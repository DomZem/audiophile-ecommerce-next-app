import { render, screen } from "@testing-library/react";
import { HeroSection } from "./HeroSection";

describe("HeroSection", () => {
  it("should render heading", () => {
    render(<HeroSection />);

    const heading = screen.getByRole("heading", {
      name: /xx99 mark || headphones/i,
    });

    expect(heading).toBeInTheDocument();
  });
});

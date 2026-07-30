import { describe, expect, it } from "vitest";
import { slugify, splitList } from "./utils";

describe("content helpers", () => {
  it("creates stable URL slugs", () => {
    expect(slugify("4-Axis Robotic Arm")).toBe("4-axis-robotic-arm");
  });

  it("normalizes newline and comma separated lists", () => {
    expect(splitList("CAD, Robotics\nManufacturing")).toEqual([
      "CAD",
      "Robotics",
      "Manufacturing",
    ]);
  });
});

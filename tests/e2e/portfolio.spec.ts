import { expect, test } from "@playwright/test";

test("homepage project stack cycles and exposes project links", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Jacob White/);
  await expect(page.getByRole("heading", { name: /Designing machines/ })).toBeVisible();

  const counter = page.getByText("01 / 04", { exact: true });
  await expect(counter).toBeVisible();
  await page.getByRole("button", { name: "Next featured project" }).click();
  await expect(page.getByText("02 / 04", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("button", { name: /Current project: 210 Robotics/ }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Open project" })).toHaveAttribute(
    "href",
    "/projects/210-robotics",
  );
});

test("research brief opens and skills switch to certifications", async ({ page }) => {
  await page.goto("/research");
  await page.getByRole("button", { name: /Open research brief/i }).first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("button", { name: "Close research brief" })).toBeVisible();

  await page.goto("/skills");
  await page.getByRole("tab", { name: /Certifications/ }).click();
  await expect(page.getByText("Designcenter NX Associate", { exact: true }).first()).toBeVisible();
  await expect(page.getByText(/What it validates/i)).toBeVisible();
});

test("gallery opens a lightbox and admin is protected", async ({ page }) => {
  await page.goto("/gallery");
  const galleryImage = page.locator("main button").filter({ has: page.locator("img") }).first();
  await galleryImage.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("button", { name: "Close gallery" })).toBeVisible();

  await page.goto("/admin");
  await expect(page).toHaveURL(/\/sign-in/);
  await expect(page.getByRole("textbox", { name: "Email address" })).toBeVisible();
});

test("mobile navigation works without horizontal overflow", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"), "mobile-only assertion");
  await page.goto("/");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);

  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("link", { name: "Skills" }).click();
  await expect(page).toHaveURL(/\/skills$/);
  await expect(
    page.getByRole("heading", { name: /Technical range, with the story behind it/ }),
  ).toBeVisible();
});

import { test, expect } from "@playwright/test"

test("has title", async ({ page }) => {
  await page.goto("/")
  await expect(page).toHaveTitle(/Bancho/)
})

test.describe("Filters", () => {
  test("show filters", async ({ page }) => {
    const bigCheckbox = page.getByLabel("Grande")
    const bigQuery = "big=Grande"
    await page.goto("/")
    await page.getByRole("button", { name: "Filtros" }).click()
    await expect(page.getByRole("heading", { name: "Filtros" })).toBeVisible()
    await bigCheckbox.click()
    await page.waitForURL(/Grande/)
    expect(page.url()).toContain(bigQuery)
    await bigCheckbox.click()
    await page.waitForURL("/")
    expect(page.url()).not.toContain(bigQuery)
  })
})

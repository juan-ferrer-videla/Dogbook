import { test, expect } from "@playwright/test"

test("test", async ({ page }) => {
  const emailInput = page.locator(`input[type="email"]`)
  const passwordInput = page.locator(`input[type="password"]`)
  const submit = page.getByRole("button", { name: /^(Siguiente|Next)$/i })
  await page.goto("https://bancho.vercel.app/")
  await page.getByRole("button", { name: "Iniciar sesión" }).click()
  await page.getByRole("button", { name: "Sign in with Google" }).click()
  await emailInput.fill("juan.ferrer.videla@gmail.com")
  await submit.click()
  await expect(passwordInput).toBeVisible()
})

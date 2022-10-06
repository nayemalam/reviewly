import { expect, test } from '@playwright/test'

test('it has header title', async ({ page }) => {
  await page.goto('/')
  const navigationTitle = page.locator('id=navigation-title')
  await expect(navigationTitle).toHaveText('Reviewly')
})

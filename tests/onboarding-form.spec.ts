import { test, expect } from "@playwright/test"

test("submit onboarding form with demo data", async ({ page }) => {
  await page.goto("/for-providers/new-client-onboarding")
  await expect(page.locator("h1")).toContainText("New Client Onboarding")

  // ===== SECTION 1: Account Information =====
  await page.fill("#facilityLegalName", "Buckeye Behavioral Health Center, LLC")
  await page.fill("#dba", "Buckeye BHC")
  await page.fill("#projectedStartDate", "2026-05-01")
  await page.fill("#addressLine1", "450 West Broad Street")
  await page.fill("#addressLine2", "Suite 200")
  await page.fill("#city", "Columbus")

  // State select
  await page.locator("button:has-text('State')").first().click()
  await page.locator("[role='option']:has-text('OH')").click()
  await page.fill("#zip", "43215")

  // ===== SECTION 2: Contacts =====
  await page.fill("#primaryContactName", "Sarah Mitchell")
  await page.fill("#primaryContactRole", "Office Manager")
  await page.fill("#primaryContactPhone", "6145559001")
  await page.fill("#primaryContactEmail", "sarah.mitchell@buckeyebhc.com")
  await page.fill("#escalationContactName", "Dr. Robert Chen")
  await page.fill("#escalationContactPhone", "6145559002")
  await page.fill("#escalationContactEmail", "dr.chen@buckeyebhc.com")

  // After-hours coverage
  await page.locator("#afterHoursCoverage").check()

  // ===== SECTION 3: Shipping =====
  // UPS is default — leave it
  await page.locator("#courier-yes").check()
  await page.waitForTimeout(500)
  await page.fill("#courierPickupWindow", "3:00 PM - 5:00 PM")
  await page.fill("#courierPickupStartDate", "2026-05-01")
  await page.locator("#suppliesNeeded").check()
  await page.fill("#suppliesNotes", "Need urine cups, swabs, and shipping boxes for 50 patients/week")

  // ===== SECTION 4: Result Delivery =====
  await page.locator("#hl7Enabled").check()
  await page.locator("#faxEnabled").check()
  await page.waitForTimeout(300)
  await page.fill("#faxNumber", "6145559099")
  await page.locator("#emailResultsEnabled").check()
  await page.waitForTimeout(300)
  await page.fill("#resultsEmail", "results@buckeyebhc.com")
  await page.fill("#alertsEmail", "admin@buckeyebhc.com")
  await page.fill("#requestedEmr", "eClinicalWorks")

  // ===== SECTION 5: Services =====
  await page.locator("#sampleTypeToxicology").check()
  await page.locator("#sampleTypeBloodSerum").check()
  await page.locator("#sampleTypeClinicalChemistry").check()

  // ===== SECTION 6: Providers =====
  // Open Add Provider dialog
  await page.locator("button:has-text('Add Provider')").click()
  await page.waitForTimeout(500)

  // Fill provider dialog fields (uses #providerName, #npi, etc.)
  await page.fill("#providerName", "Dr. Robert Chen")
  await page.fill("#npi", "1234567890")
  await page.fill("#credentials", "MD")
  await page.fill("#providerEmail", "dr.chen@buckeyebhc.com")
  await page.fill("#providerPhone", "6145559003")

  // Click "Add Provider" button inside dialog
  await page.locator("[role='dialog'] button:has-text('Add Provider')").click()
  await page.waitForTimeout(500)

  // ===== SECTION 7: Authorization =====
  await page.locator("#providerAcknowledgement").check()
  await page.locator("#esig-authorize").check()
  await page.locator("#cocTestingRequested").check()
  await page.waitForTimeout(500)
  await page.locator("#cocRiderAcknowledgement").check()

  // ===== SECTION 8: Submit =====
  await page.fill("#authorizedRepName", "Sarah Mitchell")
  await page.fill("#authorizedRepTitle", "Office Manager")

  // Submit the form
  await page.locator("button[type='submit']:has-text('Submit Onboarding Request')").click()

  // Wait for API response
  await page.waitForTimeout(15_000)

  // Capture result
  const bodyText = await page.textContent("body")
  const submitted = bodyText?.includes("Submitted") || bodyText?.includes("submitted")
  const hasSubmissionId = bodyText?.includes("LL-")

  console.log("=== TEST RESULTS ===")
  console.log("Submission success:", submitted)
  console.log("Has submission ID:", hasSubmissionId)

  await page.screenshot({ path: "tests/onboarding-result.png", fullPage: true })

  expect(submitted || hasSubmissionId).toBeTruthy()
})

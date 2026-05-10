/**
 * Creates deterministic auth credentials for Playwright runs.
 * The optional {@code uniqueIdentifier} lets specs reserve separate users
 * (e.g. {@code auth.spec.ts} passes "unique" so it never reuses the account
 * that the shared auth setup script provisions beforehand).
 */
export const getTestData = (browserName: string, uniqueIdentifier: string) => {
  const uniqueId = `${browserName}`; // Unique ID per browser run
  const uniqueLength = browserName.toLowerCase() === "webkit" ? 4 : 5;
  const unique = uniqueLength.toString() + uniqueIdentifier.length;
  return {
    name: browserName,
    email: `${uniqueId}@${uniqueIdentifier}.com`,
    phone: `+4312345${unique}6789${unique}`,
    password: "testKey123"
  };
};
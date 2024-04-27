export function generateRandomPassword(
  minLength: number,
  minLowercase: number,
  minUppercase: number,
  minNumbers: number,
  minSymbols: number,
): string {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()-_=+";

  const allChars = [lowercaseChars, uppercaseChars, numberChars, symbolChars].map((charSet, index) => ({
    charSet,
    shouldInclude: index === 0 ? minLowercase : index === 1 ? minUppercase : index === 2 ? minNumbers : minSymbols,
  }));

  let password = "";

  // Add required characters from each character set
  allChars.forEach(({ charSet, shouldInclude }) => {
    for (let i = 0; i < shouldInclude; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      password += charSet[randomIndex];
    }
  });

  // Add additional characters to meet minimum length
  const remainingLength = minLength - password.length;
  for (let i = 0; i < remainingLength; i++) {
    const randomCharSetIndex = Math.floor(Math.random() * allChars.length);
    const randomCharSet = allChars[randomCharSetIndex].charSet;
    const randomIndex = Math.floor(Math.random() * randomCharSet.length);
    password += randomCharSet[randomIndex];
  }

  // Shuffle the characters in the password
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

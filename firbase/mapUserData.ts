export const mapUserData = (user) => {
  const { uid, email, displayName, photoURL, emailVerified } = user;
  return { uid, email, displayName, photoURL, emailVerified };
};

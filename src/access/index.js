/** @param {import('payload').AccessArgs} args */
export function isAdmin({ req }) {
  if (!req.user) return false;
  return req.user.roles?.includes("admin") ?? false;
}

/** @param {import('payload').AccessArgs} args */
export function isAuthenticated({ req }) {
  return Boolean(req.user);
}

/** @param {import('payload').AccessArgs} args */
export function isCustomer({ req }) {
  if (!req.user) return false;
  return req.user.roles?.includes("customer") ?? true;
}

/** @param {import('payload').AccessArgs} args */
export function adminOrPublishedStatus({ req: { user } }) {
  if (user?.roles?.includes("admin")) return true;
  return { _status: { equals: "published" } };
}

/** @param {import('payload').FieldAccessArgs} args */
export function adminOnlyFieldAccess({ req: { user } }) {
  return user?.roles?.includes("admin") ?? false;
}

/** @param {import('payload').AccessArgs} args */
export function isDocumentOwner({ req }) {
  if (req.user?.roles?.includes("admin")) return true;
  if (req.user?.id) {
    return { customer: { equals: req.user.id } };
  }
  return false;
}

export const publicRead = () => true;

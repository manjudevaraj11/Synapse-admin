let accessToken: string | null = null;
console.log('accessToken: ', accessToken);

export const tokenService = {
  set(token: string) {
    accessToken = token;
  },
  get() {
    return accessToken;
  },
  clear() {
    accessToken = null;
  }
};

export const authService = {
  login: (email: string, password: string): boolean => {
    if (email === 'admin@sanrafael.gov.co' && password === 'SanRafael2026*') {
      localStorage.setItem('auth_token', 'demo-token');
      localStorage.setItem('auth_user', JSON.stringify({ email }));
      return true;
    }
    return false;
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_token');
  },

  getUser: () => {
    const user = localStorage.getItem('auth_user');
    return user ? JSON.parse(user) : null;
  },
};
import jwtDecode from 'jwt-decode';

export function isTokenValid(responseToken) {
  const token = responseToken || localStorage.getItem('token');
  if (token !== null) {
    try {
      const data = jwtDecode(token);
      const exp = data.exp.toString().padEnd(13, '0');
      return parseInt(exp) > new Date().getTime();
    } catch (e) {
      return false;
    }
  } else {
    return false;
  }
}
let variable = "production";
let ENDPOINT;
let SOCKET_ENDPOINT;
if (variable === "local") {
  SOCKET_ENDPOINT = "http://localhost:3000";
  ENDPOINT = "http://localhost:3000";
}
if (variable === "uninet") {
  ENDPOINT = "http://10.83.217.233:3000";
  SOCKET_ENDPOINT = "http://10.83.217.233:3000";
}
if (variable === "production") {
  ENDPOINT = "http://192.168.8.22:3000";
  SOCKET_ENDPOINT = "http://192.168.8.22:3000";
}
if (variable === "jumbo") {
  ENDPOINT = "http://10.83.169.63:3000";
  SOCKET_ENDPOINT = "http://10.83.169.63:3000";
}
export { ENDPOINT, SOCKET_ENDPOINT };

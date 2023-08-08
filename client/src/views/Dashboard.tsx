export const Dashboard = () => {
  const tokenItem = JSON.parse(window.localStorage.getItem('access_token') || '{}');
  console.log(tokenItem);
  return (
    <>
      Dashboard
    </>
  )
};

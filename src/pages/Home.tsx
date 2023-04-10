import { useTheme } from "~/context/ThemeContext";

function Home() {
  const { isDarkTheme, toggleTheme } = useTheme();
  return <div>Home page</div>;
}

export default Home;

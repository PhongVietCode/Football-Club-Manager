import { Route, Routes } from "react-router-dom";
import {
  MainLayout,
  HomePage,
  AuthLayout,
  Login,
  Register,
  LeaderBoard,
  Profile,
  MatchLayout,
  CreateMatchLayout,
} from "@/pages";
import {
  AddPlayerManual,
  InputMatchInfo,
  SplitTeam,
  MatchInfo,
} from "./pages/match/components";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index path="home" element={<HomePage />} />
        <Route path="match" element={<MatchLayout />}>
          <Route path=":id" element={<MatchInfo />} />
        </Route>
        <Route path="create-match" element={<CreateMatchLayout />}>
          <Route path="step-1" element={<InputMatchInfo />} />
          <Route path=":id/step-2" element={<AddPlayerManual />} />
          <Route path=":id/step-3" element={<SplitTeam />} />
        </Route>
        <Route path="leaderboard" element={<LeaderBoard />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route index path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;

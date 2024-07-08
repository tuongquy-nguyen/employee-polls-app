import {
  CREATE_QUESTION_PATH,
  DASHBOARD_PATH,
  ERROR_PATH,
  LEADERBOARD_PATH,
  QUESTION_PATH,
} from "./constants/paths";
import DashboardPage from "./pages/DashBoardPage/DashBoardPage";
import QuestionPage from "./pages/QuestionPage/QuestionPage";
import CreateQuestionPage from "./pages/CreateQuestionPage/CreateQuestionPage";
import LeaderboardPage from "./pages/LeaderBoardPage/LeaderBoardPage";
import NotFound404Page from "./pages/Error/NotFound404Page";

export const authedRoutes = [
  {
    path: DASHBOARD_PATH,
    exact: true,
    element: <DashboardPage />,
  },
  {
    path: QUESTION_PATH,
    exact: false,
    element: <QuestionPage />,
  },
  {
    path: CREATE_QUESTION_PATH,
    exact: false,
    element: <CreateQuestionPage />,
  },
  {
    path: LEADERBOARD_PATH,
    exact: false,
    element: <LeaderboardPage />,
  },
  {
    path: ERROR_PATH,
    exact: false,
    element: <NotFound404Page />,
  },
];

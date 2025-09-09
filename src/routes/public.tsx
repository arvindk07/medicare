import { lazyImport } from "@/helper/lazyImport";
import { NotFound } from "../modules/misc";

const { AuthRoutes }: any = lazyImport(
  () => import("../modules/auth"),
  "AuthRoutes"
);
// const { TestRoutes }: any = lazyImport(
//   () => import("../modules/test"),
//   "TestRoutes"
// );
// const { DashboardRoutes }: any = lazyImport(
//   () => import("../modules/dashboard"),
//   "DashboardRoutes"
// )
// const { AnnotationRoutes }: any = lazyImport(
//   () => import("../modules/annotation"),
//   "AnnotationRoutes"
// )

export const publicRoutes = [
  {
    path: "/auth/*",
    element: <AuthRoutes />,
  },
  //   {
  //     path: "/test/*",
  //     element: <TestRoutes />,
  //   },
  //   {
  //     path: "/app/dashboard/*",
  //     element: <DashboardRoutes />,
  //   },
  //   {
  //     path: "/app/annotation/*",
  //     element: <AnnotationRoutes />,
  //   },
  {
    path: "*",
    element: <NotFound />,
  },
];

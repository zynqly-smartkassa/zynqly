"use client";

import { useGetAccessTkQuery } from "@/redux/api/apis/auth";
import { useGetDashboardQuery } from "@/redux/api/apis/dashboard";
import { FullPageLoader } from "@/components/ui/loader";
import React from "react";

/**
 * Gate that defers rendering of the authenticated app shell until an access
 * token has been resolved.
 *
 * On mount it kicks off `getAccessTk`, which exchanges the refresh-token
 * cookie for a fresh access token via a server action. Once a token exists it
 * also prefetches the dashboard so the first authenticated route is ready by
 * the time the children render. A simple loading placeholder is shown while
 * either request is in flight.
 */
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoading: isLoadingTk, isSuccess: hasTk } =
    useGetAccessTkQuery(undefined);

  const {data, isLoading: isLoadingDashboard} = useGetDashboardQuery(undefined, {skip: !hasTk})

  if (isLoadingTk || (hasTk && isLoadingDashboard) ) {
    {/* Branded full-page loader shown while the access token or dashboard data is being fetched */}
    return <FullPageLoader label="Einen Moment, wir holen deine Fahrten …" />;
  }

  return <>{children}</>;
};

export default AuthProvider;

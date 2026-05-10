"use client";

import { useGetAccessTkQuery } from "@/redux/api/apis/auth";
import { useGetDashboardQuery } from "@/redux/api/apis/dashboard";
import React, { useEffect } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoading: isLoadingTk, isSuccess: hasTk } =
    useGetAccessTkQuery(undefined);

  const {data, isLoading: isLoadingDashboard} = useGetDashboardQuery(undefined, {skip: !hasTk})

  if (isLoadingTk || (hasTk && isLoadingDashboard) ) {
    return <h2>Loading</h2>;
  }

  return <>{children}</>;
};

export default AuthProvider;

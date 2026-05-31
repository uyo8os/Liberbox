"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { NetworkIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import LoopbackManager from "@/components/LoopbackManager";
import { useTranslation } from "react-i18next";

export default function ToolsPage() {
  const { t } = useTranslation();
  const [loopbackDialogOpen, setLoopbackDialogOpen] = useState(false);
  const [isWindows, setIsWindows] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const platform = navigator.platform.toLowerCase();
      setIsWindows(platform.includes("win"));
    }
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-foreground">
            {t("tools.title")}
          </h1>
          <p className="text-sm text-muted-foreground">{t("tools.subtitle")}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* UWP 回环豁免管理 */}
          {isWindows && (
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setLoopbackDialogOpen(true)}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <NetworkIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      {t("tools.loopback.title")}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {t("tools.loopback.description")}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t("tools.loopback.hint")}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* UWP 回环豁免管理对话框 */}
      <Dialog open={loopbackDialogOpen} onOpenChange={setLoopbackDialogOpen}>
        <DialogContent className="sm:max-w-[680px] max-h-[85vh] flex flex-col overflow-hidden p-0">
          <DialogHeader className="px-6 pt-6 pb-2 flex-shrink-0">
            <DialogTitle className="flex items-center gap-2">
              <NetworkIcon className="w-5 h-5" />{" "}
              {t("tools.loopback.dialogTitle")}
            </DialogTitle>
            <DialogDescription>
              {t("tools.loopback.dialogDescription")}
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 pb-6 flex-1 min-h-0 overflow-hidden">
            <LoopbackManager />
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}

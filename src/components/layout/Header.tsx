import { Wallet, LogOut, UserRound } from "lucide-react";

import { logoutAction } from "@/actions/logout";

import { Button } from "@/components/ui/button";

import { UserMe } from "@/types/dashboard";

interface HeaderProps {
    user: UserMe;
}

export function Header({
                           user,
                       }: HeaderProps) {
    return (
        <header className="flex items-center justify-between rounded-xl border bg-white p-6 shadow-sm">
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary p-3 text-white">
                        <Wallet className="h-6 w-6" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Digital Wallet
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Gerencie sua carteira digital.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="text-right">
                    <div className="flex items-center justify-end gap-2">
                        <UserRound className="h-4 w-4 text-muted-foreground" />

                        <span className="font-semibold">
              {user.name}
            </span>
                    </div>

                    <p className="text-sm text-muted-foreground">
                        Conta {user.accountNumber}
                    </p>
                </div>

                <form action={logoutAction}>
                    <Button
                        variant="outline"
                        className="gap-2"
                        type="submit"
                    >
                        <LogOut className="h-4 w-4" />

                        Sair
                    </Button>
                </form>
            </div>
        </header>
    );
}
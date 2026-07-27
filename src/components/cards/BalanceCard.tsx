import { Wallet } from 'lucide-react';

interface BalanceCardProps {
    balance: number;
    accountNumber: string;
}

export function BalanceCard({
                                balance,
                                accountNumber,
                            }: BalanceCardProps) {
    return (
        <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-lg">
            <div className="flex items-start justify-between">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-300">
                        <Wallet size={20} />

                        <span className="text-sm font-medium uppercase tracking-wider">
              Saldo Atual
            </span>
                    </div>

                    <h2 className="text-5xl font-bold tracking-tight">
                        {balance.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        })}
                    </h2>
                </div>

                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">
          Atualizado agora
        </span>
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-white/20 pt-5">
                <div>
                    <p className="text-xs uppercase tracking-widest text-slate-400">
                        Conta
                    </p>

                    <p className="font-semibold tracking-wider">
                        {accountNumber}
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-xs uppercase tracking-widest text-slate-400">
                        Banco
                    </p>

                    <p className="font-semibold">
                        Digital Wallet
                    </p>
                </div>
            </div>
        </div>
    );
}
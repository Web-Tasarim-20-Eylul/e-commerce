"use client";

import { Truck, RotateCcw, ShieldCheck, Lock } from "lucide-react";

export default function ProductFeatures() {
  const features = [
    {
      icon: Truck,
      title: "Ücretsiz Kargo",
      description: "$100 üzeri",
      color: "text-primary",
    },
    {
      icon: RotateCcw,
      title: "Kolay İade",
      description: "30 gün",
      color: "text-success",
    },
    {
      icon: ShieldCheck,
      title: "Garantili Ürün",
      description: "Orijinal",
      color: "text-warning",
    },
    {
      icon: Lock,
      title: "Güvenli Ödeme",
      description: "SSL",
      color: "text-secondary",
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-default-50 dark:bg-default-100/30 rounded-lg border border-default-200 dark:border-default-100">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <div key={index} className="flex items-center gap-3">
            <div className={`${feature.color}`}>
              <Icon className="w-6 h-6" strokeWidth={2} />
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground">
                {feature.title}
              </p>
              <p className="text-xs text-default-500">{feature.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

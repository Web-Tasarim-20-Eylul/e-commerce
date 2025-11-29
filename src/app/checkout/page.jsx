"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Divider,
  Select,
  SelectItem,
} from "@heroui/react";
import Link from "next/link";
import { useCartStore } from "@/stores";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  MapPin,
  User,
  Mail,
  Phone,
  ShoppingBag,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotal);
  const clearCart = useCartStore((state) => state.clearCart);

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = getTotal();
  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 5.99) : 0;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setOrderComplete(true);
    clearCart();

    // Redirect after 3 seconds
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  // Empty cart
  if (items.length === 0 && !orderComplete) {
    return (
      <div className="container mx-auto p-6 min-h-screen bg-background">
        <div className="text-center py-16">
          <div className="flex justify-center mb-6">
            <div className="p-6 rounded-full bg-primary/10 dark:bg-primary/20">
              <ShoppingBag className="w-16 h-16 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Sepetiniz Boş
          </h2>
          <p className="text-default-500 mb-8 max-w-md mx-auto">
            Ödeme yapabilmek için önce sepetinize ürün eklemelisiniz.
          </p>
          <Button as={Link} href="/" color="primary" size="lg">
            Alışverişe Başla
          </Button>
        </div>
      </div>
    );
  }

  // Order Complete
  if (orderComplete) {
    return (
      <div className="container mx-auto p-6 min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full border-none bg-background/60 dark:bg-default-100/50">
          <CardBody className="text-center p-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-success/10 dark:bg-success/20">
                <CheckCircle className="w-16 h-16 text-success" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Sipariş Tamamlandı!
            </h2>
            <p className="text-default-500 mb-6">
              Siparişiniz başarıyla alındı. Teşekkür ederiz!
            </p>
            <div className="bg-default-50 dark:bg-default-100/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-default-500 mb-2">Sipariş Özeti</p>
              <p className="text-2xl font-bold text-primary">
                ${total.toFixed(2)}
              </p>
            </div>
            <p className="text-sm text-default-500">
              Ana sayfaya yönlendiriliyorsunuz...
            </p>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 min-h-screen bg-background">
      <div className="flex items-center gap-4 mb-8">
        <Button
          as={Link}
          href="/sepet"
          variant="light"
          isIconOnly
          aria-label="Sepete dön"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-3xl font-bold text-foreground">Ödeme</h1>
      </div>

      <form onSubmit={handleCheckout}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card className="border-none bg-background/60 dark:bg-default-100/50">
              <CardBody className="gap-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">
                    İletişim Bilgileri
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Ad"
                    placeholder="Adınız"
                    required
                    classNames={{
                      input: "text-foreground",
                      inputWrapper:
                        "bg-default-100 dark:bg-default-50/10 border-none",
                    }}
                  />
                  <Input
                    label="Soyad"
                    placeholder="Soyadınız"
                    required
                    classNames={{
                      input: "text-foreground",
                      inputWrapper:
                        "bg-default-100 dark:bg-default-50/10 border-none",
                    }}
                  />
                </div>
                <Input
                  type="email"
                  label="E-posta"
                  placeholder="ornek@email.com"
                  required
                  startContent={<Mail className="w-4 h-4 text-default-400" />}
                  classNames={{
                    input: "text-foreground",
                    inputWrapper:
                      "bg-default-100 dark:bg-default-50/10 border-none",
                  }}
                />
                <Input
                  type="tel"
                  label="Telefon"
                  placeholder="+90 (555) 123 45 67"
                  required
                  startContent={<Phone className="w-4 h-4 text-default-400" />}
                  classNames={{
                    input: "text-foreground",
                    inputWrapper:
                      "bg-default-100 dark:bg-default-50/10 border-none",
                  }}
                />
              </CardBody>
            </Card>

            {/* Shipping Address */}
            <Card className="border-none bg-background/60 dark:bg-default-100/50">
              <CardBody className="gap-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">
                    Teslimat Adresi
                  </h2>
                </div>
                <Input
                  label="Adres"
                  placeholder="Sokak, Cadde, Mahalle"
                  required
                  classNames={{
                    input: "text-foreground",
                    inputWrapper:
                      "bg-default-100 dark:bg-default-50/10 border-none",
                  }}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select
                    label="Şehir"
                    placeholder="Şehir seçin"
                    required
                    classNames={{
                      trigger:
                        "bg-default-100 dark:bg-default-50/10 border-none",
                      value: "text-foreground",
                    }}
                  >
                    <SelectItem key="istanbul">İstanbul</SelectItem>
                    <SelectItem key="ankara">Ankara</SelectItem>
                    <SelectItem key="izmir">İzmir</SelectItem>
                    <SelectItem key="bursa">Bursa</SelectItem>
                  </Select>
                  <Select
                    label="İlçe"
                    placeholder="İlçe seçin"
                    required
                    classNames={{
                      trigger:
                        "bg-default-100 dark:bg-default-50/10 border-none",
                      value: "text-foreground",
                    }}
                  >
                    <SelectItem key="kadikoy">Kadıköy</SelectItem>
                    <SelectItem key="besiktas">Beşiktaş</SelectItem>
                    <SelectItem key="sisli">Şişli</SelectItem>
                  </Select>
                  <Input
                    label="Posta Kodu"
                    placeholder="34000"
                    required
                    classNames={{
                      input: "text-foreground",
                      inputWrapper:
                        "bg-default-100 dark:bg-default-50/10 border-none",
                    }}
                  />
                </div>
              </CardBody>
            </Card>

            {/* Payment Information */}
            <Card className="border-none bg-background/60 dark:bg-default-100/50">
              <CardBody className="gap-4">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">
                    Ödeme Bilgileri
                  </h2>
                </div>
                <Input
                  label="Kart Numarası"
                  placeholder="1234 5678 9012 3456"
                  required
                  classNames={{
                    input: "text-foreground",
                    inputWrapper:
                      "bg-default-100 dark:bg-default-50/10 border-none",
                  }}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Son Kullanma Tarihi"
                    placeholder="MM/YY"
                    required
                    classNames={{
                      input: "text-foreground",
                      inputWrapper:
                        "bg-default-100 dark:bg-default-50/10 border-none",
                    }}
                  />
                  <Input
                    label="CVV"
                    placeholder="123"
                    required
                    maxLength={3}
                    classNames={{
                      input: "text-foreground",
                      inputWrapper:
                        "bg-default-100 dark:bg-default-50/10 border-none",
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20 border-none bg-background/60 dark:bg-default-100/50">
              <CardBody className="gap-4">
                <h2 className="text-xl font-bold text-foreground">
                  Sipariş Özeti
                </h2>

                <Divider className="bg-default-200 dark:bg-default-100" />

                {/* Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 bg-default-50 dark:bg-default-100/30 rounded-lg flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-xs text-default-500">
                          {item.quantity} x ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <Divider className="bg-default-200 dark:bg-default-100" />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-default-500">Ara Toplam</span>
                    <span className="font-semibold text-foreground">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-default-500">Kargo</span>
                    <span className="font-semibold text-foreground">
                      {shipping === 0 ? (
                        <span className="text-success">Ücretsiz 🎉</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-default-500">KDV (%18)</span>
                    <span className="font-semibold text-foreground">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Divider className="bg-default-200 dark:bg-default-100" />

                <div className="flex justify-between text-lg">
                  <span className="font-bold text-foreground">Toplam</span>
                  <span className="font-bold text-primary text-xl">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  fullWidth
                  isLoading={isProcessing}
                  startContent={
                    !isProcessing && <CreditCard className="w-5 h-5" />
                  }
                >
                  {isProcessing ? "İşleniyor..." : "Ödemeyi Tamamla"}
                </Button>

                <p className="text-xs text-center text-default-500">
                  Ödeme bilgileriniz güvenli bir şekilde şifrelenir
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}

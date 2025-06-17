"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search, X } from "lucide-react"
import Image from "next/image"
import UserAccountNav from "@/components/user-account-nav"

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image
              src="https://sjjfexdrfeimv3f6.public.blob.vercel-storage.com/assets/logos/viapublica/viapublica-logo-RxGkXkykLJhpX6yooUW1AQUMuT18wQ.svg"
              alt="Vía Pública Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/catalogo" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Catálogo</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Categorías</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/categoria/carteles"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Carteles</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Carteles publicitarios tradicionales y digitales
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/categoria/pantallas"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Pantallas LED</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Pantallas digitales y LED de alta visibilidad
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/categoria/marquesinas"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Marquesinas</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Marquesinas y refugios en paradas de transporte
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/categoria/vallas"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Vallas</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Vallas publicitarias en obras y espacios urbanos
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Publica tu cartel</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/publicar/dueno"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Soy dueño de un cartel</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Publica tu espacio publicitario y genera ingresos
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/publicar/agencia"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Soy una agencia</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Gestiona múltiples espacios publicitarios con nuestras herramientas
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/publicar/precios"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Precios</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Conoce nuestros planes para dueños y agencias
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <Link href="/" className="mr-6 flex items-center space-x-2 md:hidden">
          <Image
            src="https://sjjfexdrfeimv3f6.public.blob.vercel-storage.com/assets/logos/viapublica/viapublica-logo-RxGkXkykLJhpX6yooUW1AQUMuT18wQ.svg"
            alt="Vía Pública Logo"
            width={100}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {showSearch ? (
            <div className="flex items-center w-full max-w-sm space-x-2">
              <Input type="search" placeholder="Buscar espacios publicitarios..." className="w-full" />
              <Button variant="ghost" size="icon" onClick={() => setShowSearch(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </Button>
          )}
          <div className="hidden md:flex">
            <UserAccountNav />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                  <Image
                    src="https://sjjfexdrfeimv3f6.public.blob.vercel-storage.com/assets/logos/viapublica/viapublica-logo-RxGkXkykLJhpX6yooUW1AQUMuT18wQ.svg"
                    alt="Vía Pública Logo"
                    width={100}
                    height={32}
                    className="h-8 w-auto"
                  />
                </Link>
                <Link href="/catalogo" className="hover:text-foreground/80">
                  Catálogo
                </Link>
                <Link href="/categorias" className="hover:text-foreground/80">
                  Categorías
                </Link>
                <div className="grid gap-3 pl-3 pt-2 pb-2 border-y">
                  <span className="font-semibold">Publica tu cartel</span>
                  <Link href="/publicar/dueno" className="hover:text-foreground/80 text-base">
                    Soy dueño de un cartel
                  </Link>
                  <Link href="/publicar/agencia" className="hover:text-foreground/80 text-base">
                    Soy una agencia
                  </Link>
                  <Link href="/publicar/precios" className="hover:text-foreground/80 text-base">
                    Precios
                  </Link>
                </div>
                <Link href="/auth/login" className="hover:text-foreground/80">
                  Iniciar Sesión
                </Link>
                <Link href="/auth/register" className="hover:text-foreground/80">
                  Registrarse
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

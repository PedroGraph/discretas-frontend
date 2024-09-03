import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react"

export default function StoreFooter() {
  return (
    <footer className="bg-black text-gray-600 py-12 h-auto">
      <div className="xl:container xl:mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Enlaces rápidos */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-primary text-white">Inicio</a></li>
              <li><a href="/lenceria" className="hover:text-primary text-white">Productos</a></li>
              <li><a href="/about" className="hover:text-primary text-white">Sobre nosotros</a></li>
              <li><a href="#" className="hover:text-primary text-white">Contacto</a></li>
              <li><a href="#" className="hover:text-primary text-white">Política de privacidad</a></li>
            </ul>
          </div>

          {/* Información de contacto */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-white">
                <MapPin className="w-5 h-5 mr-2" />
                <span>123 Calle Tienda, Ciudad, País</span>
              </li>
              <li className="flex items-center text-white">
                <Phone className="w-5 h-5 mr-2" />
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center text-white">
                <Mail className="w-5 h-5 mr-2" />
                <span className="max-w-[10px] w-full">info@discretaseduccion.com</span>
              </li>
            </ul>
          </div>

          {/* Suscripción al boletín */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Suscríbete a nuestro boletín</h3>
            <p className="mb-4 text-white">Recibe las últimas ofertas y novedades directamente en tu correo.</p>
            <form className="flex flex-col space-y-2">
              <input type="email" placeholder="Tu correo electrónico" />
              <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Suscribirse</button>
            </form>
          </div>

          {/* Redes sociales */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary text-white">
                <Facebook className="w-6 h-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="hover:text-primary text-white">
                <Instagram className="w-6 h-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="hover:text-primary text-white">
                <Twitter className="w-6 h-6" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>

        {/* Derechos de autor */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p>&copy; {new Date().getFullYear()} Mi Tienda. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
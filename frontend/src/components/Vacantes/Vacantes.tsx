// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Vacantes/Vacantes.tsx
import { useEffect, useState, Fragment, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Vacante from './Vacante';
import Spinner from '../layout/Spinner';
import { CRMContext } from '../../context/CRMContext';



import { CheckCircleIcon } from '@heroicons/react/20/solid'

const navigation = {
    categories: [
        {
            name: 'Women',
            clothing: [
                [
                    { name: 'Tops', href: '#' },
                    { name: 'Dresses', href: '#' },
                    { name: 'Pants', href: '#' },
                    { name: 'Denim', href: '#' },
                    { name: 'Sweaters', href: '#' },
                    { name: 'T-Shirts', href: '#' },
                ],
                [
                    { name: 'Jackets', href: '#' },
                    { name: 'Activewear', href: '#' },
                    { name: 'Shorts', href: '#' },
                    { name: 'Swimwear', href: '#' },
                    { name: 'Browse All', href: '#' },
                ],
            ],
            accessories: [
                { name: 'Shoes', href: '#' },
                { name: 'Jewelry', href: '#' },
                { name: 'Handbags', href: '#' },
                { name: 'Socks', href: '#' },
                { name: 'Hats', href: '#' },
                { name: 'Browse All', href: '#' },
            ],
            categories: [
                { name: 'New Arrivals', href: '#' },
                { name: 'Sale', href: '#' },
                { name: 'Basic Tees', href: '#' },
                { name: 'Artwork Tees', href: '#' },
            ],
        },
        {
            name: 'Men',
            clothing: [
                [
                    { name: 'Dress Shirts', href: '#' },
                    { name: 'Pants', href: '#' },
                    { name: 'Jackets', href: '#' },
                    { name: 'T-Shirts', href: '#' },
                    { name: 'Jeans', href: '#' },
                    { name: 'Hoodies', href: '#' },
                ],
                [
                    { name: 'Vests', href: '#' },
                    { name: 'Kilts', href: '#' },
                    { name: 'Outdoors', href: '#' },
                    { name: 'Capes', href: '#' },
                    { name: 'Browse All', href: '#' },
                ],
            ],
            accessories: [
                { name: 'Watches', href: '#' },
                { name: 'Boots', href: '#' },
                { name: 'Fanny Packs', href: '#' },
                { name: 'Sunglasses', href: '#' },
                { name: 'Browse All', href: '#' },
            ],
            categories: [
                { name: 'Just Added', href: '#' },
                { name: 'Clearance', href: '#' },
                { name: 'Graphic Tees', href: '#' },
            ],
        },
    ],
    other: [
        { name: 'Company', href: '#' },
        { name: 'Stores', href: '#' },
    ],
}
const orders = [
    {
        number: 'WU88191111',
        href: '#',
        invoiceHref: '#',
        createdDate: 'Jul 6, 2021',
        createdDatetime: '2021-07-06',
        deliveredDate: 'July 12, 2021',
        deliveredDatetime: '2021-07-12',
        total: '$160.00',
        products: [
            {
                id: 1,
                name: 'Micro Backpack',
                description:
                    'Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.',
                href: '#',
                price: '$70.00',
                imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/order-history-page-03-product-01.jpg',
                imageAlt:
                    'Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.',
            },
            // More products...
        ],
    },
    // More orders...
]
const footerNavigation = {
    products: [
        { name: 'Bags', href: '#' },
        { name: 'Tees', href: '#' },
        { name: 'Objects', href: '#' },
        { name: 'Home Goods', href: '#' },
        { name: 'Accessories', href: '#' },
    ],
    company: [
        { name: 'Who we are', href: '#' },
        { name: 'Sustainability', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Terms & Conditions', href: '#' },
        { name: 'Privacy', href: '#' },
    ],
    customerService: [
        { name: 'Contact', href: '#' },
        { name: 'Shipping', href: '#' },
        { name: 'Returns', href: '#' },
        { name: 'Warranty', href: '#' },
        { name: 'Secure Payments', href: '#' },
        { name: 'FAQ', href: '#' },
        { name: 'Find a store', href: '#' },
    ],
}


// Interfaz para definir la estructura de las vacantes
interface Vacante {
    _id: string;
    titulo: string;
    salario_ofrecido: number;
    imagen_empresa?: string;
}

function Vacantes() {
    const [vacantes, setVacantes] = useState<Vacante[]>([]);
    const [actualizarVacantes, setActualizarVacantes] = useState(false);
    const navigate = useNavigate();

    // Usar el contexto como arreglo
    const crmContext = useContext(CRMContext);

    // Validar que el contexto no sea undefined
    if (!crmContext) {
        throw new Error('CRMContext debe ser usado dentro de un CRMProvider');
    }

    const [auth, guardarAuth] = crmContext; // Extraer valores del contexto

    useEffect(() => {
        if (auth.token !== '') {
            const consultarAPI = async () => {
                try {
                    const vacantesConsulta = await clienteAxios.get('/vacantes', {
                        headers: { Authorization: `Bearer ${auth.token}` },
                    });
                    setVacantes(vacantesConsulta.data);
                } catch (error: any) {
                    console.error('Error al consultar la API:', error);
                    if (error.response?.status === 500) {
                        navigate('/iniciar-sesion');
                    }
                }
            };

            consultarAPI();
        } else {
            navigate('/iniciar-sesion');
        }
    }, [actualizarVacantes, auth.token, navigate]);

    if (!auth.auth) {
        navigate('/iniciar-sesion');
    }

    if (!vacantes.length) return <Spinner />;

    

    return (
        <div className="bg-gray-50 listado-empleados border-gray-400 border-t-4 my-0 ">
            <main className="">
                <section aria-labelledby="recent-heading" className="">
                    <h2 id="recent-heading" className="sr-only">
                        Recent orders
                    </h2>
                    <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
                        <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
                            {orders.map((order) => (
                                <div
                                    key={order.number}
                                    className=""
                                >
                                    <h3 className="sr-only">
                                        Order placed on <time dateTime={order.createdDatetime}>{order.createdDate}</time>
                                    </h3>
                                    <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                                        <dl className="grid flex-1 ">
                                            <div>
                                                <dt className="font-medium text-gray-900 text-2xl ">Total amount</dt>

                                            </div>
                                        </dl>
                                    </div>
                                    {/* Products */}
                                    <h4 className="sr-only">Items</h4>
                                    <ul role="list" className="divide-y divide-gray-200">
                                        {order.products.map((product) => (
                                            <li key={product.id} className="p-4 sm:p-6">
                                                <div className="flex items-center sm:items-start">
                                                    <div className="size-20 shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:size-40">
                                                        <img alt={product.imageAlt} src={product.imageSrc} className="size-full object-cover" />
                                                    </div>
                                                    <div className="ml-6 flex-1 text-sm">
                                                        <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                                                            <h5>{product.name}</h5>
                                                            <p className="mt-2 sm:mt-0">{product.price}</p>
                                                        </div>
                                                        <p className="hidden text-gray-500 sm:mt-2 sm:block">{product.description}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-6 sm:flex sm:justify-between">
                                                    <div className="flex items-center">
                                                        <CheckCircleIcon aria-hidden="true" className="size-5 text-green-500" />
                                                        <p className="ml-2 text-sm font-medium text-gray-500">
                                                            Delivered on <time dateTime={order.deliveredDatetime}>{order.deliveredDate}</time>
                                                        </p>
                                                    </div>
                                                    <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                                                        <a
                                                            href={order.invoiceHref}
                                                            className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                                                        >
                                                            <span>View Invoice</span>
                                                            <span className="sr-only">for order {order.number}</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )


}

export default Vacantes;




    // return (
    //     <Fragment>
    //         <h2>Vacantes</h2>
    //         <Link to={'/vacantes/nuevo'} className="btn btn-verde nvo-cliente">
    //             <i className="fas fa-plus-circle"></i>
    //             Nueva Vacante
    //         </Link>
    //         <ul className="listado-vacantes">
    //             {vacantes.map((vacante) => (
    //                 <Vacante
    //                     key={vacante._id}
    //                     vacante={vacante}
    //                     setActualizarVacantes={setActualizarVacantes}
    //                 />
    //             ))}
    //         </ul>
    //     </Fragment>
    // );




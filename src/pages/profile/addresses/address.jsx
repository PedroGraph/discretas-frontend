import { Trash, PenBox, Plus, HeartIcon } from 'lucide-react';
import AddressFormModal from './addressform';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function AddressesInfo({ addresses, setAddressToUser, deleteAddressFromUser }) {
    const [editingAddress, setEditingAddress] = useState(null);
    const { register, handleSubmit, reset, setValue } = useForm();

    const handleAddress = (data) => {
        const addressData = new FormData(data.target);
        const address = {
            name: addressData.get('name'),
            street: addressData.get('street'),
            city: addressData.get('city'),
            state: addressData.get('state'),
            zip: addressData.get('zip'),
            phone: addressData.get('phone'),
            property: addressData.get('property'),
            default: addressData.get('default') ? true : false,
            indications: addressData.get('indications'),
        };
        console.log(address);
        setAddressToUser(address);
        reset();
        document.getElementById('addressModal').close();
        setEditingAddress(null);
    };

    const handleEdit = (address) => {
        setEditingAddress(address);
        Object.keys(address).forEach(key => {
            setValue(key, address[key]);
        });
        document.getElementById('addressModal').showModal();
    };

    return (
        <div className="flex flex-col gap-8">
            <form className="flex flex-col gap-8">
                <div>
                    <h1 className="text-2xl font-bold dark:text-white">Mis Direcciones</h1>
                    <span className="text-sm text-gray-600 dark:text-gray-200">Gestiona tus direcciones de envío</span>
                </div>
                <div className={`grid xs:grid-cols-1 ${addresses.length > 0 ? "lg:grid-cols-2" : "lg:grid-cols-1"} lg:grid-cols-2 gap-4 w-full`}>
                    {addresses?.map((address, index) => (
                        <div className={`border-2 border-gray-400 p-4 flex rounded-lg ${address.deleting ? 'animate-pulse bg-gray-200' : ''}`} key={index}>
                            <div className="w-5/6 flex flex-col justify-between gap-10">
                                <h1 className="text-base font-bold text-black dark:text-white">{address.name}</h1>
                                <p className="flex flex-col">
                                    <span className="text-sm text-gray-600 dark:text-gray-200">{address.street}</span>
                                    <span className="text-sm text-gray-600 dark:text-gray-200">{address.city}</span>
                                    <span className="text-sm text-gray-600 dark:text-gray-200">{address.phone}</span>
                                </p>
                            </div>
                            <div className='flex w-1/6 justify-end gap-2'>
                                {address.default && <HeartIcon className="w-5 h-5 text-[#8941ff] fill-[#8941ff] dark:text-white dark:fill-white cursor-pointer" onClick={() => deleteAddressFromUser(address.id)} />}
                                <Trash className='w-5 h-5 text-black dark:text-white cursor-pointer' onClick={() => deleteAddressFromUser(address.id)} />
                                <PenBox className='w-5 h-5 text-black dark:text-white cursor-pointer' onClick={() => handleEdit(address)} />
                            </div>
                        </div>
                    ))}
                    <div
                        className="border-2 border-gray-400 p-4 flex flex-col justify-center items-center rounded-lg cursor-pointer"
                        onClick={() => {
                            setEditingAddress(null);
                            document.getElementById('addressModal').showModal();
                        }}
                    >
                        <Plus className='w-5 h-5 text-black dark:text-white' />
                        <p className='text-black dark:text-white'>Añadir nueva dirección</p>
                    </div>
                </div>
            </form>
            <AddressFormModal handleAddress={handleAddress} editingAddress={editingAddress}  setEditingAddress={setEditingAddress} />
        </div>
    )
}
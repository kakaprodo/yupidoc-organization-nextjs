'use client'
import { useState } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from '@/redux/store'


export default function StoreProvider({
    children,
}: {
    children: React.ReactNode
}) {
    // On utilise useState avec une fonction (() => makeStore())
    // React va exécuter cette fonction UNIQUEMENT lors du tout premier rendu.
    // C'est 100% sûr pour le serveur et le client, et ça évite l'erreur de "ref".
    const [store] = useState(() => makeStore())

    return <Provider store={store}>{children}</Provider>
}
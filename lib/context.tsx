"use client"

import {
	Character as CharacterModel,
	Entity as EntityModel,
	Session as SessionModel,
	Strife as StrifeModel,
	User as UserModel,
} from "@prisma/client"
import { Provider, ReactNode, createContext, useContext, useState } from "react"

function createDatabaseValueContextExports<T>(defaultValue: T): [
	() => T,
	() => (value: T) => () => Promise<void>,
	ReturnType<typeof createDatabaseValueContextProvider<T>>,
]
{
	const TContext = createContext<T>(defaultValue)
	const useT = () => useContext(TContext)

	const SetTContext = createContext<(value: T) => () => Promise<void>>(() => async () => {})
	const useSetT = () => useContext(SetTContext)

	return [useT, useSetT, createDatabaseValueContextProvider<T>(TContext.Provider, SetTContext.Provider)]
}

function createDatabaseValueContextProvider<T>(
	ContextProvider: Provider<T>,
	SetContextProvider: Provider<(value: T) => () => Promise<void>>,
)
{
	return ({
		children,
		databaseValue,
		setDatabaseValue,
	}: {
		children: ReactNode,
		databaseValue: T,
		setDatabaseValue: (value: T) => Promise<T>,
	}) =>
	{
		const [getT, setT] = useState(databaseValue)
		return (
			<ContextProvider value={getT}>
				<SetContextProvider value={(value: T) => () => setDatabaseValue(value).then(setT)}>
					{children}
				</SetContextProvider>
			</ContextProvider>
		)
	}
}

function createDatabaseObjectContextExports<T>(): [
	() => T,
	() => T | null,
	Provider<T | null>
]
{
	const TContext = createContext<T | null>(null)
	const useT = () => useContext(TContext)!
	const useNullableT = () => useContext(TContext)
	return [useT, useNullableT, TContext.Provider]
}

export type Entity = EntityModel
export type Character = CharacterModel & {entity: Entity}
export type User = UserModel & {characters: Character[]}
export type Session = SessionModel
export type Strife = StrifeModel & {entities: Entity[]}

export const [useUser, useNullableUser, UserContextProvider] = createDatabaseObjectContextExports<User>()
export const [useCharacter, useNullableCharacter, CharacterContextProvider] = createDatabaseObjectContextExports<Character>()
export const [useEntity, useNullableEntity, EntityContextProvider] = createDatabaseObjectContextExports<Entity>()
export const [useStrife, useNullableStrife, StrifeContextProvider] = createDatabaseObjectContextExports<Strife>()

export const [usePower, useSetPower, PowerContextProvider] = createDatabaseValueContextExports(0)

type GetEventHandlers<
	T extends keyof JSX.IntrinsicElements
> = Extract<keyof JSX.IntrinsicElements[T], `on${string}`>

export type EventFor<
	TElement extends keyof JSX.IntrinsicElements,
	THandler extends GetEventHandlers<TElement>
> = JSX.IntrinsicElements[TElement][THandler] extends
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	| ((e: infer TEvent) => any)
	| undefined
	? TEvent
	: never
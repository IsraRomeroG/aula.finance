export const CATEGORY_IDS = [
	'finanzas-personales',
	'credito-y-deudas',
	'inversiones',
] as const;

export type CategoryId = (typeof CATEGORY_IDS)[number];

export const CATEGORIES = {
	'finanzas-personales': {
		name: 'Finanzas personales',
		description: 'Organización, presupuesto, ahorro y decisiones cotidianas.',
	},
	'credito-y-deudas': {
		name: 'Crédito y deudas',
		description: 'Uso responsable del crédito y estrategias para reducir deudas.',
	},
	inversiones: {
		name: 'Inversiones',
		description: 'Conceptos y primeros pasos para invertir con mayor claridad.',
	},
} as const satisfies Record<CategoryId, { name: string; description: string }>;

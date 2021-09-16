const templateConfig = {
    strategies: [
        {
            components: [
                {
                    year: 1,
                    credits: 100,
                },
                {
                    year: 2,
                    credits: 100,
                },
                {
                    year: 3,
                    credits: 100,
                },
            ],
        },
        {
            components: [
                {
                    year: 2,
                    credits: 100,
                },
                {
                    year: 3,
                    credits: 120,
                },
            ],
        },
        {
            components: [
                {
                    year: 2,
                    credits: 120,
                },
                {
                    year: 3,
                    credits: 100,
                },
            ],
        },
    ],
    templates: [
		{
			displayName: "Bsc Computer Science",
			description: "Calculate Computer Science classification",
			key: "bsc-computer-science"
		}
	],
};

export { templateConfig };

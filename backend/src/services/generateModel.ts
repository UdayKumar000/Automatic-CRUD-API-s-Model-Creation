interface Field {
    name: string;
    type: string;
    attributes?: string[] | [""];
}

interface Model {
    name: string;
    fields: Field[];
}

export function generateModel(model: Model): string {
    try {


        const fields: string = model.fields.map(f => `${f.name} ${f.type} ${f.attributes?.join(' ') || ['']}`).join('\n')

        const str: string = `\nmodel ${model.name}{\n${fields}\n}`;
        console.log("Generated model:\n", str);
        return str
    } catch (err) {
        console.error("Error generating model:", err);
        throw err;
    }

}
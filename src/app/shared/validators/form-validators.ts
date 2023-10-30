import { FormControl, FormGroup } from "@angular/forms";

export class FormValidatios {
    static equalsTo(otherField: string) {
        const validator = (formControl: FormControl) => {
            //Valor do campo passado se ele não é nulo
            if (otherField == null) {
                throw new Error('É necessário informar um capo');
            };

            //Verifica se o campo atual tem uma raiz. Se não tiver, ele retorna null.
            if (!formControl.root || !(<FormGroup>formControl.root).controls) {
                return null;
            }

            //Obtém o controle do formulário para o campo otherField. Se o campo não existir, ele lança um erro.
            const field = (<FormGroup>formControl.root).get(otherField);

            if (!field) {
                throw new Error('É necessário informar um capo');
            }

            if (field.value !== formControl.value) {
                return { equalsTo: otherField }
            }
            //Retorna null, se não deu erro
            return null;
        };

        return validator;
    }
}
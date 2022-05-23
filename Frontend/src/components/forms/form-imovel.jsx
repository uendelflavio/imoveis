import React, { useState, Fragment } from "react";
import { Formik, Form } from "formik";
import { Panel, PanelBody } from "../panel/panel";
import { Modal } from "reactstrap";
import * as Yup from "yup";
import SwitchInput from "../switch-input/switch-input";
import FieldInput from "../field-input/field-input";
import PanelHeaderOption from "../panel-header-option/panel-header-option";
import ButtonActionInput from "../button-action-input/button-action-input";
import ButtonModal from "../button-modal/button-modal";
import SelectInput from "../select-input/select-input";

const dados = [
    { value: '',text: ''   },
    { value: 'AC', text: 'Acre'   },
    { value: 'AL', text: 'Alagoas'},
    { value: 'AP', text: 'Amapá' },
    { value: 'AM', text: 'Amazonas' },
    { value: 'BA', text: 'Bahia' },
    { value: 'CE', text: 'Ceará' },
    { value: 'DF', text: 'Distrito Federal' },
    { value: 'ES', text: 'Espírito Santo' },
    { value: 'GO', text: 'Goiás' },
    { value: 'MA', text: 'Maranhão' },
    { value: 'MT', text: 'Mato Grosso' },
    { value: 'MS', text: 'Mato Grosso do Sul' },
    { value: 'MG', text: 'Minas Gerais' },
    { value: 'PA', text: 'Pará' },
    { value: 'PB', text: 'Paraíba' },
    { value: 'PR', text: 'Paraná' },
    { value: 'PE', text: 'Pernambuco' },
    { value: 'PI', text: 'Piauí' },
    { value: 'RJ', text: 'Rio de Janeiro' },
    { value: 'RN', text: 'Rio Grande do Norte' },
    { value: 'RS', text: 'Rio Grande do Sul' },
    { value: 'RO', text: 'Rondônia' },
    { value: 'RR', text: 'Roraima' },
    { value: 'SC', text: 'Santa Catarina' },
    { value: 'SP', text: 'São Paulo' },
    { value: 'SE', text: 'Sergipe' },
    { value: 'TO', text: 'Tocantins' },        
];

const onSubmit = (values) => {
  console.log(values);
};

const validationSchema = Yup.object({  
  endereco: Yup.string().min(4,'4 caracteres no minimo').required("O endereço e obrigatório!"),
  numero: Yup.number()
    .typeError("Digite um numero válido")
    .required("O número e obrigatório!"),
  bairro: Yup.string().min(4,'4 caracteres no minimo').required("O bairro e obrigatório!"),
  cep: Yup.number()
    .typeError("Digite um numero válido")
    .required("O cep e obrigatório!"),
  uf: Yup.string().required('O uf e obrigatório'),
  cidade: Yup.string().min(4,'4 caracteres no minimo').required("A cidade e obrigatório!"),
});

const FormImovel = ({ isModal, isUpdated, isId, row }) => {
  const [modalOpen, setModalOpen] = useState(isModal);
  const toggle = () => setModalOpen(!modalOpen);

  return (
    <Fragment>
      <ButtonModal  isUpdated={isUpdated} toggle={toggle}/>
      <Modal centered toggle={toggle} isOpen={modalOpen} autoFocus={false}>
        <Panel className="mb-0">
          <PanelHeaderOption isUpdated={isUpdated} isId={isId} />
          <PanelBody>
            <Formik
              enableReinitialize={true}
              initialValues={{                  
                  endereco: modalOpen && isUpdated ? row.endereco:"",
                  numero: modalOpen && isUpdated ? row.numero:"",
                  bairro: modalOpen && isUpdated ? row.bairro:"",
                  cep: modalOpen && isUpdated ? row.cep:"",
                  cidade: modalOpen && isUpdated ? row.cidade:"",
                  uf:modalOpen && isUpdated ? row.uf:"",
                  vistoria: modalOpen && isUpdated ? row.vistoria: false,
                  ocupado: modalOpen && isUpdated ? row.ocupado : false,
              }}              
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form>                                
                <FieldInput label="Endereço" name="endereco" focus={true} />
                <FieldInput label="Número" name="numero"/>
                <FieldInput label="Bairro" name="bairro"/>
                <FieldInput label="Cep" name="cep" />           
                <FieldInput label="Cidade" name="cidade"/>
                <SelectInput label="Uf" name="uf" dados={dados}/>
                <SwitchInput label="Vistoria" name="vistoria" checkState={row.vistoria}/>
                <SwitchInput label="Ocupado" name="ocupado" checkState={row.ocupado} />
                <ButtonActionInput
                  toggle={toggle}
                  isUpdated={isUpdated}
                  onSubmit={onSubmit}                 
                />
              </Form>
            </Formik>
          </PanelBody>
        </Panel>
      </Modal>
    </Fragment>
  );
};

export default FormImovel;

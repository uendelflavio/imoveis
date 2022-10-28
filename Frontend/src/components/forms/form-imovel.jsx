import React from "react";
import { Formik, Form, Field } from "formik";
import { Panel, PanelBody } from "../panel/panel";
import { Modal } from "reactstrap";
import { toast } from 'react-toastify';
import { uf } from 'utils/util';
import * as Yup from "yup";
import SwitchInput from "components/switch-input/switch-input";
import InputField from "components/input-field/input-field";
import PanelHeaderOption from "components/panel-header-option/panel-header-option";
import ActionButtonInput from "components/action-button-input/action-button-input";
import ButtonModal from "components/button-modal/button-modal";
import SelectInput from "components/select-input/select-input";
import MaskInput from "components/mask-input/mask-input";

import { useDispatch, useSelector } from 'react-redux';
import { listImovel,createImovel, updateImovel } from 'slices/imovel-slice';

const FormImovel = props => {

  const [modalOpen, setModalOpen] = React.useState(props.isModal);
  const [isAction, setAction] = React.useState(props.action);
  const imovel = useSelector(state => state.imovelSlice);
  const dispatch = useDispatch();

  const data = React.useMemo(() => {
      if (imovel[0]) return imovel[0]
      if (imovel) return imovel
  }, [imovel]);

  const toggle = () => setModalOpen(!modalOpen);

  const onSubmit = (values, actions) => {
     switch(isAction) {
       case 'create':
        dispatch(createImovel({ data: values }))
        toast.success('O Imovel foi criado com sucesso');
        break;
       case 'update':
        dispatch(updateImovel({ id: values.id, data:values }))
        toast.warning('O Imovel foi atualizado com sucesso');
      break;
      default:
          actions.resetForm()
          actions.setSubmitting(false)
        break;
    }
  }

  const validationSchema = Yup.object({
    endereco: Yup.string().min(4,'4 caracteres no mínimo').required("O endereço é obrigatório!"),
    numero: Yup.number().typeError("Digite um numero válido").required("O número é obrigatório!"),
    bairro: Yup.string().min(4,'4 caracteres no mínimo').required("O bairro é obrigatório!"),
    cep: Yup.string().min(10,'8 caracteres no mínimo').required("O cep é obrigatório!"),
    uf: Yup.string().ensure().required('A uf é obrigatório'),
    cidade: Yup.string().min(4,'4 caracteres no mínimo').required("A cidade é obrigatório!"),
  });

  return (
    <React.Fragment >
      <ButtonModal isAction={isAction} toggle={toggle} />
      <Formik
      onSubmit={(values, actions) => onSubmit(values, actions)}
      enableReinitialize={true}
      initialValues={{
          id: isAction === 'update' ? data.id : '',
          endereco:  isAction === 'update' ? data.endereco: '',
          numero: isAction === 'update' ? data.numero: '',
          bairro: isAction === 'update' ? data.bairro: '',
          cep:  isAction === 'update' ? data.cep: '',
          cidade: isAction === 'update' ? data.cidade: '',
          complemento: isAction === 'update' ? data.complemento: '',
          uf: isAction === 'update' ? data.uf: '',
          vistoria: isAction === 'update' ? data.vistoria: false,
          ocupado:  isAction === 'update' ? data.ocupado: false,
      }}
      validationSchema={validationSchema}
      >
        <Modal
          centered
          toggle={toggle}
          isOpen={modalOpen}
          autoFocus={false}
          onOpened={() => dispatch(listImovel({ id: props.id }))}
        >
        <Panel className="mb-0" >
          <PanelHeaderOption titleInsert="Novo Imovel" titleUpdated="Atualizar Imóvel"/>
          <PanelBody>
              <Form className="mb-0 border border-1 rounded p-2">
                <Field type="text" name="id" hidden />
                <InputField label="Endereço" name="endereco" focus={true} />
                <InputField label="Número" name="numero"/>
                <InputField label="Bairro" name="bairro" />
                <InputField label="Complemento" name="complemento"/>
                <MaskInput label="Cep" name="cep" mask="99.999-999" value />
                <InputField label="Cidade" name="cidade"/>
                <SelectInput label="Uf" name="uf" options={uf} />
                <SwitchInput label="Vistoria" name="vistoria" />
                <SwitchInput label="Ocupado" name="ocupado" />
                <ActionButtonInput toggle={toggle}  isAction={isAction} setAction={(action) => setAction(action)} onSubmit={(values, actions) => onSubmit(values, actions)} />
              </Form>
          </PanelBody>
        </Panel>
      </Modal>
    </Formik>
  </React.Fragment>
  );
};

export default FormImovel;

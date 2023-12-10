'use client';

import React, { useState, useCallback, useEffect } from "react";

import styles from './page.module.css'
import { Cards } from './components/Cards/Cards'
import { Button } from './components/Button'
import { Badge } from './components/Badge'
import { onGetAllUsers, onGetAllPilas, onGetAllBlocks, onSendPilaTransferation  } from './services/api-services/repositories';
import { format } from "date-fns-tz";
import Swal from "sweetalert2";

export default function Home() {

  const [users, setUsers] = useState();
  const [pilas, setPilas] = useState();
  const [blocos, setBlocos] = useState();
  const [transferPila, setTransferPila] = useState({});
  const [transferUser, setTransferUser] = useState({});
  
  useEffect(() => {
    onGetPilas()
    onGetUsers()
    onGetBlocks()
  }, []);
  const onGetPilas = useCallback(async () => {
    await onGetAllPilas().then((res) => {
      if(res?.result?.length > 0){
        setPilas(res?.result)
      }
    });
  }, []);

  const onGetUsers = useCallback(async()=> {
    await onGetAllUsers().then((res) => {
      if(res?.result?.length > 0){
        setUsers(res?.result);
      }
    });
  }, [])  

  const onGetBlocks = useCallback(async() => {
    await onGetAllBlocks().then((res) => {
      if(res?.result?.length > 0){
        setBlocos(res?.result);
      }
    });
  }, []);


  const sendPilaTransferation = useCallback(async () => {
    if(transferPila?.noncePila &&
       transferUser?.chaveUsuarioDestino && 
       transferUser?.nomeUsuarioDestino
      ) {
        const body = {
          chaveUsuarioDestino: transferUser.chaveUsuarioDestino,
          nomeUsuarioDestino: transferUser.nomeUsuarioDestino,
          noncePila: transferPila.noncePila
        }
        await onSendPilaTransferation(body).then(async(res) => {
          if(res?.status === 200){

            Swal.fire({
              title: "Sucesso!",
              text: "Transferencia realizada com sucesso!",
              icon: "success",
              confirmButtonText: "Ok",
            }).then(async() => {
              await onGetPilas();
              await onGetUsers();
              await onGetBlocks();
            });
          } else {
            Swal.fire({
              title: "Erro!",
              text: "Ocorreu um problema transferir o pila!",
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
          setTransferUser({})
          setTransferPila({})
        });
      }
  }, [onGetBlocks, onGetPilas, onGetUsers, transferPila.noncePila, transferUser.chaveUsuarioDestino, transferUser.nomeUsuarioDestino]);


  return (
    <main className={styles.main}>
      <div className={styles.row}>
        <div>
          <Cards
            text={'Pila Minerado'}
          >
            <div>
              <table>
                <thead>
                  <tr>
                    <th className={styles.textHeaderTable}>
                      <div className={styles.textTable}>
                        Pilas
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <div className={styles.tbodyRow}>
                    {pilas ? (
                      pilas?.map(({ id, chaveCriador, dataCriacao, nonce, nomeCriador, status, transacoes }, key) =>  {
                        const dd = new Date(dataCriacao);
                        const formattedTime = format(dd, "dd/MM/yyyy");
                        return(
                        <div key={key} className={styles.mainRowTbody}>
                            <tr>
                              <td>
                                <div className={styles.textTable}>
                                  Número bloco: 
                                </div>
                              </td>
                              <td>
                                <div className={styles.textTableClip}>
                                  {nonce}
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className={styles.textTable}>
                                  Usuário Minerador: 
                                </div>
                              </td>
                              <td>
                                <div className={styles.textTable}>
                                  {nomeCriador}
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className={styles.textTable}>
                                  Data Criação: 
                                </div>
                              </td>
                              <td>
                                <div className={styles.textTable}>
                                  {formattedTime}
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className={styles.textTable}>
                                  Status: 
                                </div>
                              </td>
                              <td>
                                <Badge statusBadge={status}>
                                  {status}
                                </Badge>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className={styles.textTable}>
                                  Transações:
                                </div>
                              </td>
                              <td>
                                <div className={styles.textTable}>
                                  {transacoes?.length}
                                </div>
                              </td>
                            </tr>
                          </div>
                        )
                    }
                      )
                    ) : (
                      <></>
                    )}
                  </div>
                </tbody>
              </table>
            </div>
          </Cards>
        </div>
        <div>
          <Cards
            text={'Bloco Minerado'}
          >
          <div>
              <table>
                <thead>
                  <tr>
                    <th className={styles.textHeaderTable}>
                      <div className={styles.textTable}>
                        Blocos
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <div className={styles.tbodyRow}>
                    {blocos ? (
                      blocos?.map(({ id, numeroBloco, nomeUsuarioMinerador, nonce, transacoes }, key) => (
                        <div key={key} className={styles.mainRowTbody}>
                          <tr>
                            <td>
                              <div className={styles.textTable}>
                                Número bloco: 
                              </div>
                            </td>
                            <td>
                              <div className={styles.textTable}>
                                {numeroBloco}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className={styles.textTable}>
                                Usuário minerador: 
                              </div>
                            </td>
                            <td>
                              <div className={styles.textTable}>
                                {nomeUsuarioMinerador}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className={styles.textTable}>
                                Nonce: 
                              </div>
                            </td>
                            <td>
                              <div className={styles.textTableClip}>
                                {nonce}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className={styles.textTable}>
                                Transações:
                              </div>
                            </td>
                            <td>
                              <div className={styles.textTable}>
                                {transacoes?.length}
                              </div>
                            </td>
                          </tr>
                        </div>
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                </tbody>
              </table>
            </div>

          </Cards>
        </div>
        <div>
          <Cards
            text={'Usuários'}
          >
            <div>
              <table>
                <thead>
                  <tr>
                    <th className={styles.textHeaderTable}>
                      <div className={styles.textTable}>
                        Nome
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <div className={styles.tbodyRow}>
                    {users ? (
                      users?.map(({ id, nome, chavePublica }, key) => (
                        <div key={key} className={styles.mainRowTbody}>
                          <tr>
                            <td>
                              <div className={styles.textTableClip}>
                                {nome}
                              </div>
                            </td>
                            <td>
                              <div className={styles.pubCode}>
                                {chavePublica}
                              </div>
                            </td>
                          </tr>
                        </div>
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                </tbody>
              </table>
            </div>
          </Cards>
        </div>
      </div>
      <div className={styles.row}>
        <div>
          <Cards
              text={'Transferencia'}
              hugeCard
            >
              <div className={styles.rowTransferCard}>
                <div className={styles.marginRight}>
                  <table>
                    <thead>
                      <tr>
                        <th className={styles.textHeaderTable}>
                          <div className={styles.textTable}>
                            Pilas:
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <div className={styles.tbodyRow}>
                        {pilas ? (
                          pilas?.map(({ id, chaveCriador, dataCriacao, nonce, nomeCriador, status, transacoes }, key) =>  {
                            const dd = new Date(dataCriacao);
                            const formattedTime = format(dd, "dd/MM/yyyy");
                            const styleCard = transferPila?.noncePila === nonce ? styles.mainRowTbodySelected : styles.mainRowTbody
                            if(status === 'VALIDO'){
                              return(
                                <div key={key} className={styleCard}>
                                  <tr>
                                    <td>
                                      <div className={styles.textTable}>
                                        Número bloco: 
                                      </div>
                                    </td>
                                    <td>
                                      <div className={styles.textTableClip}>
                                        {nonce}
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className={styles.textTable}>
                                        Usuário Minerador: 
                                      </div>
                                    </td>
                                    <td>
                                      <div className={styles.textTable}>
                                        {nomeCriador}
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className={styles.textTable}>
                                        Data Criação: 
                                      </div>
                                    </td>
                                    <td>
                                      <div className={styles.textTable}>
                                        {formattedTime}
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className={styles.textTable}>
                                        Status: 
                                      </div>
                                    </td>
                                    <td>
                                      <Badge statusBadge={status}>
                                        {status}
                                      </Badge>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className={styles.textTable}>
                                        Transações:
                                      </div>
                                    </td>
                                    <td>
                                      <div className={styles.textTable}>
                                        {transacoes?.length}
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td></td>
                                    <td>
                                      <Button
                                        type="submit"
                                        fullWidth
                                        color="blueGreenLight"
                                        onClick={() => {
                                          if(transferPila?.noncePila === nonce){
                                            setTransferPila({})
                                          } else {
                                            setTransferPila({ noncePila: nonce })
                                          }
                                        }}
                                        style={{ height: 30, fontSize: 15, width: 120, border: '1px solid grey' }}
                                        >
                                        Selecionar
                                      </Button>
                                    </td>
                                  </tr>
                                </div>
                              )
                            }

                          })
                        ) : (
                          <></>
                        )}
                      </div>
                    </tbody>
                  </table>
                </div>

                <div className={styles.marginRight}>
                  <table>
                    <thead>
                      <tr>
                        <th className={styles.textHeaderTable}>
                          <div className={styles.textTable}>
                            Usuários:
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <div className={styles.tbodyRow}>
                        {users ? (
                          users?.map(({ id, nome, chavePublica }, key) => {

                            const styleCard = transferUser?.chaveUsuarioDestino === chavePublica ? styles.mainRowTbodySelected : styles.mainRowTbody
                            if(nome !== 'vtogni' && nome !== 'viniciustogni'){
                              return(
                                <div key={key} className={styleCard}>
                                  <tr>
                                    <td>
                                      <div className={styles.textClipOption2}>
                                        {nome}
                                      </div>
                                    </td>
                                    <td>
                                      <Button
                                        type="submit"
                                        fullWidth
                                        color="blueGreenLight"
                                        onClick={() => {
                                          if(transferUser?.chaveUsuarioDestino === chavePublica){
                                            setTransferUser({})
                                          } else {
                                            setTransferUser({ chaveUsuarioDestino: chavePublica, nomeUsuarioDestino: nome })
                                          }
                                        }}
                                        style={{ height: 30, fontSize: 14, width: 90, border: '1px solid grey' }}
                                        >
                                          Selecionar
                                      </Button>
                                    </td>
                                  </tr>
                                </div>
                              )
                            }
                          })
                        ) : (
                          <></>
                        )}
                      </div>
                    </tbody>
                  </table>
                </div>
                
                <div className={styles.mainColumnTransferInfo}>
                  <div className={styles.singleBoxBody}>
                    <p className={styles.simpleTextClip}>
                      Pila: { transferPila?.noncePila } 
                    </p>
                  </div>
                  <div className={styles.singleBoxBody}>
                    <p>
                      Usuário: { transferUser?.nomeUsuarioDestino } 
                    </p>
                  </div>
                  <div className={styles.transferButton}>
                    <Button
                        type="submit"
                        fullWidth
                        color="blueGreenLight"
                        onClick={() => {
                         sendPilaTransferation()
                        }}
                        disabled={ !(transferPila?.noncePila && transferUser?.chaveUsuarioDestino && transferUser?.nomeUsuarioDestino) }
                        style={{ height: 35, fontSize: 15, with: 30, border: '1px solid grey' }}
                        >
                          Transferir
                    </Button>
                  </div>

                </div>
            </div>
          </Cards>
        </div>
      </div>
    </main>
  )
}

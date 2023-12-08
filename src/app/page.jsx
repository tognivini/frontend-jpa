'use client';

import React, { useState, useCallback, useEffect } from "react";

import Image from 'next/image'
import styles from './page.module.css'
import { Cards } from './components/cards/cards'
import { Button } from './components/Button'
import { onGetAllUsers, onGetAllPilas, onGetAllBlocks, onSendPilaTransferation  } from './services/api-services/repositories';
import { format } from "date-fns-tz";

export default function Home() {

  const [users, setUsers] = useState();
  const [pilas, setPilas] = useState();
  const [blocos, setBlocos] = useState();
  const [transferPila, setTransferPila] = useState({});
  const [transferUser, setTransferUser] = useState({});

  const obj = [
          {
            chaveCriador: "U3VuIFJTQSBwdWJsaWMga2V5LCA1MTIgYml0cwogIHBhcmFtczogbnVsbAogIG1vZHVsdXM6IDEwMTMwOTQwMTc4Njk1ODQ1Nzk3NzUwMjI5MTU2OTQ5ODUwNzgxMTI4MjY4MDY3ODc5MjEzODgzNTc4MzY0MDUzOTEyMjA5MTA0MDY2MjQxNjI5NTMwOTY0NzgxNDQ5MDQ5MTYxMDM1MjMxMzg3ODkyMTM0MDY3MzM4NDc2NTg5MjAxMDIxODE1NTE5NTY1NzA2ODA1NzI1NzU5CiAgcHVibGljIGV4cG9uZW50OiA2NTUzNw==",
            dataCriacao: "2023-12-02T15:01:14.574+00:00",
            id: 249457488,
            nomeCriador: "vtogni",
            nonce: "22372635860884766055455797916077963842557713896426896919196269533006083651631",
            status: "VALIDO",
            transacoes: [
                  {
                    dataTransacao: "2023-12-02T15:01:33.320+00:00",
                    noncePila: "22372635860884766055455797916077963842557713896426896919196269533006083651631"
                  }
              ]
          },
          {
            chaveCriador: "U3VuIFJTQSBwdWJsaWMga2V5LCA1MTIgYml0cwogIHBhcmFtczogbnVsbAogIG1vZHVsdXM6IDEwMTMwOTQwMTc4Njk1ODQ1Nzk3NzUwMjI5MTU2OTQ5ODUwNzgxMTI4MjY4MDY3ODc5MjEzODgzNTc4MzY0MDUzOTEyMjA5MTA0MDY2MjQxNjI5NTMwOTY0NzgxNDQ5MDQ5MTYxMDM1MjMxMzg3ODkyMTM0MDY3MzM4NDc2NTg5MjAxMDIxODE1NTE5NTY1NzA2ODA1NzI1NzU5CiAgcHVibGljIGV4cG9uZW50OiA2NTUzNw==",
            dataCriacao: "2023-12-02T15:01:56.561+00:00",
            id: 249457490,
            nomeCriador: "vtogni",
            nonce: "23242449543561633558683402639785202824645805439326219705512497018216914288862",
            status: "VALIDO",
            transacoes: [
                  {
                    dataTransacao: "2023-12-02T15:02:33.323+00:00",
                    noncePila: "23242449543561633558683402639785202824645805439326219705512497018216914288862"
                  }
              ]
          },
          {
            chaveCriador: "U3VuIFJTQSBwdWJsaWMga2V5LCA1MTIgYml0cwogIHBhcmFtczogbnVsbAogIG1vZHVsdXM6IDEwMTMwOTQwMTc4Njk1ODQ1Nzk3NzUwMjI5MTU2OTQ5ODUwNzgxMTI4MjY4MDY3ODc5MjEzODgzNTc4MzY0MDUzOTEyMjA5MTA0MDY2MjQxNjI5NTMwOTY0NzgxNDQ5MDQ5MTYxMDM1MjMxMzg3ODkyMTM0MDY3MzM4NDc2NTg5MjAxMDIxODE1NTE5NTY1NzA2ODA1NzI1NzU5CiAgcHVibGljIGV4cG9uZW50OiA2NTUzNw==",
            dataCriacao: "2023-12-02T15:02:00.584+00:00",
            id: 249457491,
            nomeCriador: "vtogni",
            nonce: "22066203781391939160524697511147527096761217903794768743683582439393866130464",
            status: "BLOCO_EM_VALIDACAO",
            transacoes: [
                  {
                    dataTransacao: "2023-12-02T15:02:33.323+00:00",
                    noncePila: "22066203781391939160524697511147527096761217903794768743683582439393866130464"
                  } 
            ]
          },
          {
            chaveCriador: "U3VuIFJTQSBwdWJsaWMga2V5LCA1MTIgYml0cwogIHBhcmFtczogbnVsbAogIG1vZHVsdXM6IDEwMTMwOTQwMTc4Njk1ODQ1Nzk3NzUwMjI5MTU2OTQ5ODUwNzgxMTI4MjY4MDY3ODc5MjEzODgzNTc4MzY0MDUzOTEyMjA5MTA0MDY2MjQxNjI5NTMwOTY0NzgxNDQ5MDQ5MTYxMDM1MjMxMzg3ODkyMTM0MDY3MzM4NDc2NTg5MjAxMDIxODE1NTE5NTY1NzA2ODA1NzI1NzU5CiAgcHVibGljIGV4cG9uZW50OiA2NTUzNw==",
            dataCriacao: "2023-12-02T15:02:00.584+00:00",
            id: 249457491,
            nomeCriador: "vtogni",
            nonce: "22066203781391939160524697511147527096761217903794768743683582439393866130464",
            status: "BLOCO_EM_VALIDACAO",
            transacoes: [
                  {
                    dataTransacao: "2023-12-02T15:02:33.323+00:00",
                    noncePila: "22066203781391939160524697511147527096761217903794768743683582439393866130464"
                  } 
            ]
          },
          {
            chaveCriador: "U3VuIFJTQSBwdWJsaWMga2V5LCA1MTIgYml0cwogIHBhcmFtczogbnVsbAogIG1vZHVsdXM6IDEwMTMwOTQwMTc4Njk1ODQ1Nzk3NzUwMjI5MTU2OTQ5ODUwNzgxMTI4MjY4MDY3ODc5MjEzODgzNTc4MzY0MDUzOTEyMjA5MTA0MDY2MjQxNjI5NTMwOTY0NzgxNDQ5MDQ5MTYxMDM1MjMxMzg3ODkyMTM0MDY3MzM4NDc2NTg5MjAxMDIxODE1NTE5NTY1NzA2ODA1NzI1NzU5CiAgcHVibGljIGV4cG9uZW50OiA2NTUzNw==",
            dataCriacao: "2023-12-02T15:02:00.584+00:00",
            id: 249457491,
            nomeCriador: "vtogni",
            nonce: "22066203781391939160524697511147527096761217903794768743683582439393866130464",
            status: "BLOCO_EM_VALIDACAO",
            transacoes: [
                  {
                    dataTransacao: "2023-12-02T15:02:33.323+00:00",
                    noncePila: "22066203781391939160524697511147527096761217903794768743683582439393866130464"
                  } 
            ]
          }
    ]
  
  useEffect(() => {
    onGetPilas().then(
      () => {
        onGetBlocks();
        onGetUsers();
      } 
    );
  }, []);

  const onGetUsers = useCallback(async () => {
    await onGetAllUsers().then((res) => {
      console.log(res)
      setUsers(res?.result);
    });
  }, []);

  const onGetPilas = useCallback(async () => {
    await onGetAllPilas().then((res) => {
      console.log(res, 'pilas')
      setPilas(obj)
      // setPilas(res?.result);/
    });
  }, []);

  const onGetBlocks = useCallback(async () => {
    await onGetAllBlocks().then((res) => {
      setBlocos(res?.result);
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
          // setBlocos();
          console.log(res)
          if(res?.status === '200'){
            await onGetPilas()
          }
        });
      }
  }, [transferPila, transferUser]);


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
                        const formattedTime = format(dd, "yyyy-MM-dd");
                        return(
                       
                        // chaveCriador
                        // dataCriacao
                        // id
                        // nomeCriador
                        // nomeCriador
                        // status
                        // transacoes
                        //{
                        // dataTransacao
                        // noncePila
                        //} 
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
                                <div className={styles.textTableClip}>
                                  {status}
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
                            const formattedTime = format(dd, "yyyy-MM-dd");
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
                                    <div className={styles.textTableClip}>
                                      {status}
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
                                <tr>
                                  <td></td>
                                  <td>
                                    <Button
                                      type="submit"
                                      fullWidth
                                      color="blueGreenLight"
                                      // smallBotton
                                      onClick={() => 
                                        setTransferPila({ noncePila: nonce })
                                      }
                                      style={{ height: 30, fontSize: 15, with: 10 }}
                                      >
                                      Selecionar
                                    </Button>
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
                          users?.map(({ id, nome, chavePublica }, key) => (
                            <div key={key} className={styles.mainRowTbody}>
                              <tr>
                                <td>
                                  <div className={styles.textTableClip}>
                                    {nome}
                                  </div>
                                </td>
                                <td>
                                  <Button
                                    type="submit"
                                    fullWidth
                                    color="blueGreenLight"
                                    // smallBotton
                                    onClick={() => 
                                        // "chaveUsuarioDestino": "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAI0l7M3k3QqtOlCor9KXDUD3gVeJ/YcDKz/ZPWVhOfwMiAIoBm5IbE8c23e57hQCIICD3buorOt4BVW1cjJi7scCAwEAAQ==",
                                        // "nomeUsuarioDestino": "londero.edu",
                                        // "noncePila": "26841470753142012877700218879437041114278892302970700364891993926177214098711"
                                      setTransferUser({ chaveUsuarioDestino: chavePublica, nomeUsuarioDestino: nome })
                                    }
                                    style={{ height: 25, fontSize: 15, with: 10 }}
                                    >
                                      Selecionar
                                  </Button>
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
                        style={{ height: 35, fontSize: 15, with: 40 }}
                        >
                          Transferir
                    </Button>
                  </div>

                </div>
            </div>
          </Cards>
        </div>

        
        

        <div>
 

        </div>

        {/* <div>
          <Button
            disabled={false}
            type="submit"
            fullWidth
            color="blueGreenLight"
            style={{ height: 40, fontSize: 20 }}
          >
            Registrar-se
          </Button>
        </div> */}
      </div>
    </main>
  )
}



{/*    
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            /> */}
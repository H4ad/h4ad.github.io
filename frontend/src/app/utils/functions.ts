/**
 * Método que espera alguns segundos para continuar executando
 */
export async function delay(milliseconds: number): Promise<void>  {
  return await new Promise(resolve => setTimeout(resolve, milliseconds));
}

/**
 * Método que retorna o valor sem referências
 *
 * @param mock O valor a ser transformado
 */
export function noRef<T>(mock: T): T {
  if (['string', 'number'].includes(typeof mock))
    return mock;

  return JSON.parse(JSON.stringify(mock));
}

/**
 * Método que retorna a mensagem erro
 *
 * @param error As informações de erro
 */
export function getErrorMessage(error: any): string {
  return error && error.error && (error.error.Message || error.error.message)  || 'Ocorreu um erro desconhecido, por favor, tente novamente';
}

export interface IRouterContext {
 orderData: IOrderData
 setOrderData: React.Dispatch<React.SetStateAction<IOrderData>>
}

export interface IOrderData {
 typePayment: string
 directionID: string
 userID: string
 listID: string
}
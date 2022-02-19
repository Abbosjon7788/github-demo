import { toast } from "react-toastify";


// Success message
export const success = (title, props) => {
     title && toast.dismiss()
     title && toast.success(<div className={'my-alert'}>{title}</div>
          , {
               ...props,
          })
}

// Warning message
export const warning = (title, props) => {
     title && toast.dismiss()
     title && toast.warning(<div className={'my-alert'}>{title}</div>
          , {
               ...props,
          })
}

// Error message
export const error = (title, props) => {
     title && toast.dismiss()
     title && toast.error(<div className={'my-alert'}>{title}</div>
          , {
               ...props,
          })
}
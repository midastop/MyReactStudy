export default function NotFoundPage() { 
  return (    		
		<div className="row my-5" id="global-content">
      <div className="col-10 offset-1">
        <div className="row text-center">
          <div className="col">
            <h2 className="fs-3 fw-bold">페이지 없음</h2>            
          </div>
        </div>
        <div className="row my-5">
          <div className="col text-center">
            요청한 페이지가 존재하지 않음
          </div>
        </div>
      </div>
    </div>
  )
}
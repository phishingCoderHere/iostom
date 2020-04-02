<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!-- 信息提示框 -->
<div id='commonTipModal' class="modal fade bs-example-modal-sm in" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" >
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-header btn-warning">
          <button type="button" class="close" data-dismiss="modal" ><span class='fa fa-times' ></span></button>
          <span class="fa fa-exclamation-triangle"></span>
          <span class="modal-title" id="mySmallModalLabel">提示</span>
        </div>
        <div class="modal-body">
          <span id='common_tip_info'>这里是提示信息</span>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div>
<!-- 成功提示框 -->
<div id='commonCheckTipModal' class="modal fade bs-example-modal-sm in" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" >
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-header btn-success">
          <button type="button" class="close" data-dismiss="modal" ><span class='fa fa-times' ></span></button>
          <span class="fa fa-check"></span>
          <span class="modal-title" id="mySmallModalLabel">提示</span>
        </div>
        <div class="modal-body">
          <span id='common_check_tip_info'>这里是提示信息</span>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div>
  
  <!-- 错误提示框 -->
<div id='commonErrorTipModal' class="modal fade bs-example-modal-sm in" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" >
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-header btn-danger">
          <button type="button" class="close" data-dismiss="modal" ><span class='fa fa-times' ></span></button>
          <span class="fa fa-frown-o"></span>
          <span class="modal-title" id="mySmallModalLabel">提示</span>
        </div>
        <div class="modal-body">
          <span id='common_error_tip_info'>这里是提示信息</span>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div>
  
<div class='smart-tip'>

</div>

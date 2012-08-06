(function($,NULL,UNDEFINED){
    function getParent(selector,className){
        var node=$(selector)[0];
        var parentNode=node.parentElement||node.parentNode;
        if(parentNode){
            if($(parentNode).hasClass(className)){
                return $(parentNode);
            }
            return getParent(parentNode,className);
        }
        return $([]);
    }
    function getChildren(selector,className){
        var result=[];
        var childNodes=$(selector)[0].childNodes;
        for(var i=0;i<childNodes.length;i++){
            var childNode=childNodes[i];
            if(childNode.nodeType!=3 && $(childNode).hasClass(className)){
                result.push(childNode);
            }
        }
        return $(result);
    }
    function openTree(selector){
        $(selector).find('.tree-title .tree-i').removeClass('tree-i1').addClass('tree-i2');
        $(selector).find('.tree-content').removeClass('tree-content-hide');
    }
    function closeTree(selector){
        $(selector).find('.tree-title .tree-i').removeClass('tree-i2').addClass('tree-i1');
        $(selector).find('.tree-content').addClass('tree-content-hide');
    }
    function bindTree(conSelector,cb){
        $(conSelector).find('.tree-title .tree-i').each(function(icon){
            var $tree=getParent(icon,'tree');
            var $icon=$(icon);
            $icon.click(function(){
                if($icon.hasClass('tree-i1')){
                    $icon.removeClass('tree-i1').addClass('tree-i2');
                    var $content=getChildren($tree,'tree-content');
                    if($content.length>0){
                        $content.removeClass('tree-content-hide');
                    }else{
                        if(cb){
                            cb($tree);
                        }
                    }
                }else{
                    $icon.removeClass('tree-i2').addClass('tree-i1');
                    getChildren($tree,'tree-content').addClass('tree-content-hide');
                }
            });
        });
    }
    $.ready(function(){
        bindTree('body');
    });
    GnimTree={
        openTree:openTree,
        closeTree:closeTree,
        bindTree:bindTree
    };
})(Gnim,null);
    
